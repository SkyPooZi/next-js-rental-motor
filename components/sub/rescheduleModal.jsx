import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';

import { MdClose } from "react-icons/md";

import {
    Input,
} from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';
import { handleReschedule } from '@/utils/services/handleReschedule';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const RescheduleModal = ({ isOpen, onClose, historyId, onSuccess }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [durasi, setDurasi] = useState('');
    const [disabledRanges, setDisabledRanges] = useState([]);
    const [minEndDate, setMinEndDate] = useState(null);
    const [image, setImage] = useState(null);
    const [motor_id, setMotorId] = useState('');
    const [stok_motor, setStokMotor] = useState(0);
    const [motorData, setMotorData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rescheduleModalDetails, setRescheduleModalDetails] = useState(null);
    const [initialDuration, setInitialDuration] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchBookedDates = async () => {
            if (!motor_id) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();

                // Filter bookings for the specific motorbike
                const bookingsForMotor = data.history.filter(item => item.motor_id === motor_id);

                // Create an object to count bookings per day
                const bookingCountPerDay = {};

                bookingsForMotor.forEach(item => {
                    const startDate = dayjs(item.tanggal_mulai);
                    const endDate = dayjs(item.tanggal_selesai);

                    // Iterate over each day in the booking range
                    for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'day'); date = date.add(1, 'day')) {
                        const dateStr = date.format('YYYY-MM-DD');

                        // Initialize count if not already present
                        if (!bookingCountPerDay[dateStr]) {
                            bookingCountPerDay[dateStr] = 0;
                        }
                        bookingCountPerDay[dateStr]++;
                    }
                });

                // Determine which dates to disable based on stock availability
                const disabledDates = Object.keys(bookingCountPerDay)
                    .filter(dateStr => bookingCountPerDay[dateStr] >= stok_motor)
                    .map(dateStr => dayjs(dateStr));

                console.log('Disabled Dates:', disabledDates);

                setDisabledRanges(disabledDates);
            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, [motor_id, token, stok_motor]);

    const shouldDisableDate = (date) => {
        const today = dayjs().startOf('day');
        if (date.isBefore(today)) return true;
        return disabledRanges.some(disabledDate => date.isSame(disabledDate, 'day'));
    };

    const shouldDisableTime = (time, selectedDate) => {
        if (!selectedDate) return false;

        const selectedDayDisabled = disabledRanges.some(disabledDate => selectedDate.isSame(disabledDate, 'day'));
        if (selectedDayDisabled) return true;

        return false;
    };

    const handleDateStart = (date) => {
        if (date) {
            const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
            setTanggalMulai(formattedDate);
            setTanggalSelesai('');
            setMinEndDate(dayjs(date).add(1, 'day'));
        } else {
            setTanggalMulai('');
        }
    };

    const handleDateEnd = (date) => {
        if (date) {
            const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
            setTanggalSelesai(formattedDate);
        } else {
            setTanggalSelesai('');
        }
    };

    useEffect(() => {
        if (tanggal_mulai && tanggal_selesai) {
            const startDate = dayjs(tanggal_mulai);
            const endDate = dayjs(tanggal_selesai);
            const duration = endDate.diff(startDate, 'day');
            setDurasi(duration);
        } else {
            setDurasi(0);
        }
    }, [tanggal_mulai, tanggal_selesai, setDurasi]);

    useEffect(() => {
        const getCancelledDetails = async () => {
            try {
                const response = await fetchCancelledModal(token, historyId);

                if (response && response.status === 200) {
                    const data = response.history;
                    console.log('Fetched data:', data);
                    setRescheduleModalDetails(data);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.list_motor.gambar_motor}`);
                    setMotorData(data.list_motor.nama_motor);
                    setMotorId(data.list_motor.id);

                    const startDate = dayjs(data.tanggal_mulai);
                    const endDate = dayjs(data.tanggal_selesai);
                    const initialDuration = endDate.diff(startDate, 'day');
                    setInitialDuration(initialDuration);
                } else {
                    console.log('No data received or incorrect status');
                }
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            }
        };

        if (historyId && isOpen) {
            getCancelledDetails();
        }
    }, [token, historyId, isOpen]);

    const handleConfirm = async () => {
        if (durasi !== initialDuration) {
            alert('Durasi penjadwalan ulang harus sama dengan durasi pesanan sebelumnya.');
            return;
        }

        setIsLoading(true);
        const result = await handleReschedule(token, historyId, tanggal_mulai, tanggal_selesai);

        if (result.success) {
            setShowNotification(true);
            onSuccess();

            setTimeout(() => {
                setShowNotification(false);
                setIsLoading(false);
                setTanggalMulai('');
                setTanggalSelesai('');
                onClose();
            }, 3000);
        } else {
            console.error('Failed to update reasons:', result.error);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        setTanggalMulai('');
        setTanggalSelesai('');
    };

    if (!isOpen) return null;

    return rescheduleModalDetails ? (
        <>
            {showNotification && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md z-50">
                    Penjadwalan ulang berhasil!
                </div>
            )}
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-25">
                <div className="bg-white p-6 rounded-lg shadow-lg relative z-40">
                    <MdClose
                        className="absolute top-4 right-4 text-gray-600 cursor-pointer"
                        size={24}
                        onClick={handleClose}
                    />
                    <div className='w-full flex flex-col gap-5'>
                        <Label>
                            <span className='font-semibold text-base'>
                                Penjadwalan Ulang
                            </span>
                        </Label>
                        <div className='flex flex-row gap-2'>
                            <Image src={image || '/images/motor/dummy.png'} alt='motor' width={100} height={0} />
                            <div className="flex flex-col gap-1">
                                <Label>
                                    <span className="text-base">
                                        {motorData || 'Motor'}
                                    </span>
                                </Label>
                                <Label>
                                    <span className="text-base">
                                        {`${rescheduleModalDetails.tanggal_mulai} - ${rescheduleModalDetails.tanggal_selesai}`}
                                    </span>
                                </Label>
                                <Label>
                                    <span className='text-base'>
                                        {`Durasi: ${rescheduleModalDetails.durasi} hari`}
                                    </span>
                                </Label>
                                <Label>
                                    <span className='text-xs text-[#ff4d30]'>
                                        Durasi penjadwalan ulang harus sama dengan pesanan sebelumnya
                                    </span>
                                </Label>
                            </div>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='flex md:flex-row flex-col gap-5'>
                                <div className='w-full flex flex-col gap-2'>
                                    <span className="text-black">
                                        Tanggal Mulai <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <DateTimePicker
                                        label="Pilih Tanggal Mulai"
                                        value={tanggal_mulai ? dayjs(tanggal_mulai) : null}
                                        onChange={handleDateStart}
                                        shouldDisableDate={shouldDisableDate}
                                        shouldDisableTime={(time) => shouldDisableTime(dayjs(time), dayjs(tanggal_mulai))}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Tanggal Selesai <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <DateTimePicker
                                        label="Pilih Tanggal Selesai"
                                        value={tanggal_selesai ? dayjs(tanggal_selesai) : null}
                                        onChange={handleDateEnd}
                                        minDateTime={minEndDate}
                                        shouldDisableDate={shouldDisableDate}
                                        shouldDisableTime={(time) => shouldDisableTime(dayjs(time), dayjs(tanggal_selesai))}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>
                        <div className='flex md:flex-row flex-col gap-5 '>
                            <div className='text-black w-full text-sm'>
                                Durasi
                                <Input
                                    label="Durasi (hari)"
                                    value={`${durasi} hari`}
                                    disabled
                                />
                            </div>
                        </div>
                        <Button
                            onClick={handleConfirm}
                            disabled={!tanggal_mulai || !tanggal_selesai || isLoading || durasi !== initialDuration}
                        >
                            {isLoading ? 'Loading...' : 'Konfirmasi'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default RescheduleModal;
