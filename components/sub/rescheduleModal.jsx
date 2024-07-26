import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { format, differenceInDays, addDays, startOfToday, set } from "date-fns";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { MdDone, MdClose } from "react-icons/md";

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Input,
} from "@material-tailwind/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';
import { handleReschedule } from '@/utils/services/handleReschedule';
import { DayPicker } from "react-day-picker";

const RescheduleModal = ({ isOpen, onClose, historyId, onSuccess }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [durasi, setDurasi] = useState('');
    const [disabledDaysMulai, setDisabledDaysMulai] = useState([]);
    const [disabledDaysSelesai, setDisabledDaysSelesai] = useState([]);
    const [image, setImage] = useState(null);
    const [motor_id, setMotorId] = useState('');
    const [motorData, setMotorData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rescheduleModalDetails, setRescheduleModalDetails] = useState(null);
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

                const disabledRanges = data.history
                    .filter(item => item.motor_id === motor_id)
                    .map(item => {
                        const startDate = new Date(item.tanggal_mulai);
                        const endDate = new Date(item.tanggal_selesai);
                        const range = { from: startDate, to: addDays(endDate, 1) };
                        return range;
                    });
                console.log('Disabled Ranges:', disabledRanges);

                const today = startOfToday();

                const disableBeforeToday = { before: today };

                setDisabledDaysMulai([disableBeforeToday, ...disabledRanges]);
                setDisabledDaysSelesai([disableBeforeToday, ...disabledRanges]);
            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, [motor_id]);

    useEffect(() => {
        if (tanggal_mulai && tanggal_selesai) {
            const startDate = new Date(tanggal_mulai);
            const endDate = new Date(tanggal_selesai);
            const duration = differenceInDays(endDate, startDate);
            setDurasi(duration);
        } else {
            setDurasi('');
        }
    }, [tanggal_mulai, tanggal_selesai]);

    const handleDateStart = (date) => {
        if (date) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setTanggalMulai(formattedDate);
            setTanggalSelesai('');

            const minEndDate = addDays(date, 1);
            const disableBeforeMinEndDate = { before: minEndDate };
            const today = startOfToday();
            const disableBeforeToday = { before: today };

            setDisabledDaysSelesai([disableBeforeToday, disableBeforeMinEndDate, ...disabledDaysMulai]);
        } else {
            setTanggalMulai('');
        }
    };

    const handleDateEnd = (date) => {
        if (date) {
            setTanggalSelesai(format(date, 'yyyy-MM-dd'));
        } else {
            setTanggalSelesai('');
        }
    };

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
        setIsLoading(true);
        const result = await handleReschedule(token, historyId, tanggal_mulai, tanggal_selesai);

        if (result.success) {
            setShowNotification(true);
            onSuccess();
            setTimeout(() => {
                setShowNotification(false);
                onClose();
                setIsLoading(false);
                setTanggalMulai('');
                setTanggalSelesai('');
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
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-5'>
                            <div className='w-full flex flex-col gap-2'>
                                <span className="text-black">
                                    Tanggal Mulai <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            required
                                            label="Pilih Tanggal Mulai"
                                            onChange={() => null}
                                            value={tanggal_mulai ? format(new Date(tanggal_mulai), "yyyy-MM-dd") : ""}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent className="z-40">
                                        <DayPicker
                                            mode="single"
                                            selected={tanggal_mulai ? new Date(tanggal_mulai) : undefined}
                                            onSelect={handleDateStart}
                                            showOutsideDays
                                            disabled={disabledDaysMulai}
                                            className="border-0"
                                            classNames={{
                                                caption: "flex justify-center py-2 mb-4 relative items-center",
                                                caption_label: "text-sm font-medium text-gray-900",
                                                nav: "flex items-center",
                                                nav_button:
                                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                nav_button_previous: "absolute left-1.5",
                                                nav_button_next: "absolute right-1.5",
                                                table: "w-full border-collapse",
                                                head_row: "flex font-medium text-gray-900",
                                                head_cell: "m-0.5 w-9 font-normal text-sm",
                                                row: "flex w-full mt-2",
                                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal",
                                                day_range_end: "day-range-end",
                                                day_selected:
                                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                day_today: "rounded-md bg-gray-200 text-gray-900",
                                                day_outside:
                                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                day_disabled: "text-gray-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                            components={{
                                                IconLeft: ({ ...props }) => (
                                                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                                ),
                                                IconRight: ({ ...props }) => (
                                                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                                ),
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-5'>
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-black">
                                    Tanggal Selesai <span className="text-[#FF4D33] font-semibold">*</span>
                                </span>
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            required
                                            label="Pilih Tanggal Selesai"
                                            onChange={() => null}
                                            value={tanggal_selesai ? format(new Date(tanggal_selesai), "yyyy-MM-dd") : ""}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent className="z-40">
                                        <DayPicker
                                            mode="single"
                                            selected={tanggal_selesai ? new Date(tanggal_selesai) : undefined}
                                            onSelect={handleDateEnd}
                                            showOutsideDays
                                            disabled={disabledDaysSelesai}
                                            className="border-0"
                                            classNames={{
                                                caption: "flex justify-center py-2 mb-4 relative items-center",
                                                caption_label: "text-sm font-medium text-gray-900",
                                                nav: "flex items-center",
                                                nav_button:
                                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                nav_button_previous: "absolute left-1.5",
                                                nav_button_next: "absolute right-1.5",
                                                table: "w-full border-collapse",
                                                head_row: "flex font-medium text-gray-900",
                                                head_cell: "m-0.5 w-9 font-normal text-sm",
                                                row: "flex w-full mt-2",
                                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal",
                                                day_range_end: "day-range-end",
                                                day_selected:
                                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                day_today: "rounded-md bg-gray-200 text-gray-900",
                                                day_outside:
                                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                day_disabled: "text-gray-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                            components={{
                                                IconLeft: ({ ...props }) => (
                                                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                                ),
                                                IconRight: ({ ...props }) => (
                                                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                                ),
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
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
                            disabled={!tanggal_mulai || !tanggal_selesai || isLoading}
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
