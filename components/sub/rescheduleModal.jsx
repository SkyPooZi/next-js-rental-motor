'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

import { MdDone, MdClear, MdClose } from 'react-icons/md';

import {
    Input,
} from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';
import { handleConfirmReschedule } from '@/utils/services/rescheduleService';
import { handlePaymentAndReschedule } from '@/utils/services/reschedulePaymentService';
import { fetchBookedDates } from '@/utils/services/bookingService';
import { calculateDaysAgo } from '@/utils/services/dateService';
import { handleReschedule } from '@/utils/services/handleReschedule';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const RescheduleModal = ({ isOpen, onClose, historyId, onSuccess }) => {
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
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [daysAgoText, setDaysAgoText] = useState('');
    const [originalStartTime, setOriginalStartTime] = useState('');
    const [originalEndTime, setOriginalEndTime] = useState('');
    const token = Cookies.get('token');
    const userId = Cookies.get('id');
    console.log(historyId)

    useEffect(() => {
        if (rescheduleModalDetails?.created_at) {
            const daysAgo = calculateDaysAgo(rescheduleModalDetails.created_at);
            setDaysAgoText(daysAgo);
        }
    }, [rescheduleModalDetails]);

    const showNotificationWithTimeout = (message, type, timeout = 3000) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
            onClose();
        }, timeout);
    };

    const showNotificationWithTimeoutCancel = (message, type, timeout = 3000) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, timeout);
    };

    useEffect(() => {
        const getDisabledDates = async () => {
            const dates = await fetchBookedDates(motor_id, stok_motor, token, historyId);
            setDisabledRanges(dates);
        };

        getDisabledDates();
    }, [motor_id, token, stok_motor, historyId, rescheduleModalDetails]);

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

    const validateTimeMatch = () => {
        if (!tanggal_mulai || !tanggal_selesai || !rescheduleModalDetails) return false;

        const originalStartTime = dayjs(rescheduleModalDetails.tanggal_mulai);
        const originalEndTime = dayjs(rescheduleModalDetails.tanggal_selesai);

        const newStartTime = dayjs(tanggal_mulai);
        const newEndTime = dayjs(tanggal_selesai);

        const originalDuration = originalEndTime.diff(originalStartTime, 'second');
        const newDuration = newEndTime.diff(newStartTime, 'second');

        return originalDuration === newDuration;
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
    }, [tanggal_mulai, tanggal_selesai]);

    useEffect(() => {
        const getCancelledDetails = async () => {
            try {
                const response = await fetchCancelledModal(token, historyId);

                if (response && response.status === 200) {
                    const data = response.history;
                    setRescheduleModalDetails(data);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.list_motor.gambar_motor}`);
                    setMotorData(data.list_motor.nama_motor);
                    setMotorId(data.list_motor.id);

                    const startDate = dayjs(data.tanggal_mulai);
                    const endDate = dayjs(data.tanggal_selesai);
                    const initialDuration = endDate.diff(startDate, 'day');
                    setInitialDuration(initialDuration);

                    setOriginalStartTime(startDate.format('HH:mm:ss'));
                    setOriginalEndTime(endDate.format('HH:mm:ss'));
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

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', `${process.env.MIDTRANS_CLIENT_KEY}`);
        script.async = false;
        script.onload = () => {
            console.log('Midtrans Snap script loaded');
        };
        document.head.appendChild(script);
    }, []);

    const onConfirm = async () => {
        await handleConfirmReschedule({
            historyId,
            token,
            durasi,
            initialDuration,
            handleRescheduleAndNotify,
            handlePaymentAndReschedule,
            showNotificationWithTimeoutCancel,
            setIsLoading
        });
    };

    const handleRescheduleAndNotify = async () => {
        try {
            const result = await handleReschedule(token, historyId, tanggal_mulai, tanggal_selesai);
            if (result.success) {
                showNotificationWithTimeout('Penjadwalan Ulang Berhasil!', 'success');
                setTimeout(() => {
                    onSuccess();
                }, 3000)
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Failed to update reasons:', error);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        setTanggalMulai('');
        setTanggalSelesai('');
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
        const hour = date.getHours();
        let timeOfDay = '';
        if (hour >= 0 && hour < 11) {
            timeOfDay = 'pagi';
        } else if (hour >= 11 && hour < 15) {
            timeOfDay = 'siang';
        } else if (hour >= 15 && hour < 19) {
            timeOfDay = 'sore';
        } else {
            timeOfDay = 'malam';
        }
        const formattedTime = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate}, ${formattedTime} ${timeOfDay}`;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hour = date.getHours();
        let timeOfDay = '';

        if (hour >= 0 && hour < 11) {
            timeOfDay = 'pagi';
        } else if (hour >= 11 && hour < 15) {
            timeOfDay = 'siang';
        } else if (hour >= 15 && hour < 19) {
            timeOfDay = 'sore';
        } else {
            timeOfDay = 'malam';
        }

        const formattedTime = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        return `${formattedTime} ${timeOfDay}`;
    };

    if (!isOpen) return null;

    return rescheduleModalDetails ? (
        <>
            {showNotification && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${notificationType === 'success' ? 'bg-green-500' : notificationType === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white py-2 px-4 rounded-md flex items-center shadow-lg z-50`}>
                    <span>{notificationMessage}</span>
                    {notificationType === 'success' ? <MdDone className="ml-2 text-white" /> : <MdClear className="ml-2 text-white" />}
                </div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, type: 'tween' }}
                className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-25">
                <div className="bg-white p-6 rounded-lg shadow-lg relative z-40">
                    <MdClose
                        className="absolute top-4 right-4 text-gray-600 cursor-pointer"
                        size={24}
                        onClick={handleClose}
                    />
                    <div className='w-full flex flex-col gap-5'>
                        <div className='flex gap-3 items-center'>
                            <Label>
                                <span className='font-semibold text-base'>
                                    Penjadwalan Ulang
                                </span>
                            </Label>
                            <Label>
                                <span className='text-base font-semibold opacity-55'>
                                    {daysAgoText}
                                </span>
                            </Label>
                        </div>
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
                                        {`${formatDate(rescheduleModalDetails.tanggal_mulai)} - ${formatDate(rescheduleModalDetails.tanggal_selesai)}`}
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
                            onClick={onConfirm}
                            disabled={!tanggal_mulai || !tanggal_selesai || isLoading || durasi !== initialDuration || !validateTimeMatch()}
                        >
                            {isLoading ? 'Loading...' : 'Konfirmasi'}
                        </Button>
                        {!validateTimeMatch() && (
                            <div className='text-red-500 text-sm mt-2'>
                                Waktu mulai dan selesai harus sama dengan pesanan sebelumnya {`${formatTime(rescheduleModalDetails.tanggal_mulai)} - ${formatTime(rescheduleModalDetails.tanggal_selesai)}`}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    ) : null;
};

export default RescheduleModal;
