"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { PiScroll } from "react-icons/pi";
import { MdCancel, MdOutlineTimer } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { CalendarIcon } from "@radix-ui/react-icons";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoLocationSharp, IoMapSharp } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import {
    Card,
    Checkbox,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
    Select,
    Textarea,
    Option,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { format, differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import { MdDone } from "react-icons/md";
import Modal from '@/components/sub/rescheduleFormModal';
import TermsModal from '@/components/sub/termsModal';
import Footer from '@/components/main/Footer';
import Navbar from '@/components/main/Navbar';

export default function page() {
    const [rentalPrice, setRentalPrice] = useState(0);
    const [history, setHitory] = useState(null);
    const [motors, setMotors] = useState([]);
    const [diskons, setDiskons] = useState([]);
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [no_telp, setNoTelp] = useState('');
    const [akun_sosmed, setAkunSosmed] = useState('');
    const [alamat, setAlamat] = useState('');
    const [penyewa, setPenyewa] = useState('');
    const [motor_id, setMotorId] = useState('');
    const [nama_motor, setNamaMotor] = useState('');
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [keperluan_menyewa, setKeperluanMenyewa] = useState('');
    const [penerimaan_motor, setPenerimaanMotor] = useState('');
    const [nama_kontak_darurat, setNamaKontakDarurat] = useState('');
    const [nomor_kontak_darurat, setNomorKontakDarurat] = useState('');
    const [hubungan_dengan_kontak_daruat, setHubunganDenganKontakDarurat] = useState('');
    const [diskon_id, setDiskonId] = useState('');
    const [metode_pembayaran, setMetodePembayaran] = useState('');
    const [total_harga, setTotalHarga] = useState('');
    const [total_pembayaran, setTotalPembayaran] = useState('');
    const [status_history, setStatusHistory] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [checkedValue, setCheckedValue] = useState('');
    const [clickedDiantar, setClickedDiantar] = useState(false);
    const [clickedAmbil, setClickedAmbil] = useState(false);
    const [clickedPenyewaDiriSendiri, setClickedPenyewaDiriSendiri] = useState(false);
    const [clickedPenyewaOrangLain, setClickedPenyewaOrangLain] = useState(false);
    const [clickedPaymentTunai, setClickedPaymentTunai] = useState(false);
    const [clickedPaymentCashless, setClickedPaymentCashless] = useState(false);
    const [durasi, setDurasi] = useState('');
    const [HTMLResponse, setHTMLResponse] = useState('');

    const handleSelectChangeDiskon = (selectedValue) => {
        if (selectedValue) {
            const selectedDiskon = diskons.find((diskon) => diskon.id === selectedValue);
            if (selectedDiskon) {
                setDiskonId(selectedDiskon.id);
                const potonganHargaPercentage = selectedDiskon.potongan_harga;
                const totalPriceWithoutDiscount = rentalPrice * durasi;
                const discountAmount = (totalPriceWithoutDiscount * potonganHargaPercentage) / 100;
                const totalPembayaran = totalPriceWithoutDiscount - discountAmount;
                setTotalPembayaran(totalPembayaran);
                setTotalHarga(rentalPrice * durasi - selectedDiskon.potongan_harga);
            }
        };
    }

    const handleSelectChangeNamaMotor = (selectedValue) => {
        // Make sure selectedValue is not undefined or null
        if (selectedValue) {
            // Find the selected motor by nama_motor
            const selectedMotor = motors.find((motor) => motor.nama_motor === selectedValue);
            if (selectedMotor) {
                setMotorId(selectedMotor.id);
                // Update rental price based on the selected motor's price
                setRentalPrice(selectedMotor.harga_motor_per_1_hari);
                setNamaMotor(selectedMotor.nama_motor)
            }
        }
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setPenyewa(value);
        } else {
            setPenyewa('');
        }
    };

    const handleCheckboxChangePayment = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setMetodePembayaran(value);
        } else {
            setMetodePembayaran('');
        }
    }

    useEffect(() => {
        const fetchMotor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    },
                });

                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched motor:', data);
                    setMotors(data.listMotor || []); // Ensure data.listMotor is an array or default to empty array
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };
        fetchMotor();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });
                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched motor:', data);
                    setDiskons(data.diskon || []); // Ensure data.listMotor is an array or default to empty array
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_lengkap', nama_lengkap);
        formData.append('email', email);
        formData.append('no_telp', no_telp);
        formData.append('akun_sosmed', akun_sosmed);
        formData.append('alamat', alamat);
        formData.append('penyewa', penyewa);
        formData.append('motor_id', motor_id);
        formData.append('tanggal_mulai', tanggal_mulai);
        formData.append('tanggal_selesai', tanggal_selesai);
        formData.append('keperluan_menyewa', keperluan_menyewa);
        formData.append('penerimaan_motor', penerimaan_motor);
        formData.append('nama_kontak_darurat', nama_kontak_darurat);
        formData.append('nomor_kontak_darurat', nomor_kontak_darurat);
        formData.append('hubungan_dengan_kontak_darurat', hubungan_dengan_kontak_daruat);
        formData.append('diskon_id', diskon_id);
        formData.append('metode_pembayaran', metode_pembayaran);
        formData.append('total_pembayaran', total_pembayaran);
        formData.append('status_history', 'Menunggu Pembayaran');

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network Error');
            }

            const data = await response.json();
            console.log('Success', data);
            setResponse(data);

            if (response.status === 404) {
                throw new Error(response.message); // Display the error message to the user
            }

            const id_payment = data.id;

            const endpointURL = `${process.env.NEXT_PUBLIC_API_URL}/api/payment/8`;

            const htmlResponse = await fetch(endpointURL, {
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`,
                },
            });

            if (!htmlResponse.ok) {
                throw new Error('Failed to fetch payment details');
            }

            // Parse the HTML content from the response
            const htmlData = await htmlResponse.text();
            console.log('HTML Response:', htmlData);

            // Set the HTML response data as needed
            setHTMLResponse(htmlData);
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        } catch (error) {
            setResponse({ message: 'Terjadi kesalahan saat mengirim data.', error: error.message });
        } finally {
            setLoading(false);
        }
    };

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
            setTanggalMulai(format(date, 'yyyy-MM-dd'));
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
    }

    const handleClickPenyewaDiriSendiri = () => {
        setClickedPenyewaDiriSendiri(true);
        setClickedPenyewaOrangLain(false);
        setPenyewa('Diri Sendiri');
    };

    const handleClickPenyewaOrangLain = () => {
        setClickedPenyewaOrangLain(true);
        setClickedPenyewaDiriSendiri(false);
        setPenyewa('Orang Lain');
    };

    const handleClickPaymentTunai = () => {
        setClickedPaymentTunai(true);
        setClickedPaymentCashless(false);
        setMetodePembayaran('Tunai');
    };

    const handleClickPaymentCashless = () => {
        setClickedPaymentCashless(true);
        setClickedPaymentTunai(false);
        setMetodePembayaran('Cashless');
    };

    const handleClickDiantar = () => {
        setClickedDiantar(true);
        setClickedAmbil(false);
        setPenerimaanMotor('Diantar');
    };

    const handleClickAmbil = () => {
        setClickedAmbil(true);
        setClickedDiantar(false);
        setPenerimaanMotor('Ambil');
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    const openTermsModal = () => {
        setIsTermsModalOpen(true);
    }

    const closeTermsModal = () => {
        setIsTermsModalOpen(false);
    }

    return (
        <>
            <Navbar />
            <div dangerouslySetInnerHTML={{ __html: HTMLResponse }} />
            <div className='h-full w-full px-5 py-5 md:px-24 md:py-16 bg-[#F6F7F9]'>
                <div className='text-[#666666] mb-5'>
                    <span className='font-semibold text-black md:text-xl text-base flex'>
                        Booking
                    </span>
                    <span className='text-sm md:text-base'>
                        Pastikan semua detail pada halaman ini sudah benar sebelum melanjutkan ke pembayaran.
                    </span>
                </div>
                <form method="post" action="post" onSubmit={handleSubmit}>
                    <div className='flex lg:flex-row flex-col gap-5'>
                        <div className='flex lg:hidden flex-col rounded-xl mt-14 px-5 py-5 items-center gap-3 bg-white'>
                            <Image src='/images/motor/dummy.png' alt='motor' width={259} height={183} />
                            <div className='flex flex-col gap-5 '>
                                <div className='flex flex-row gap-2 items-center '>
                                    <PiScroll className='' size='25' color='black' />
                                    <span className='font-bold text-black text-sm'>
                                        Kebijakan Pembatalan & Penjadwalan Ulang
                                    </span>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-start '>
                                    <MdCancel
                                        className='' color='grey' size='25'
                                    />
                                    <span className='font-bold text-black text-sm'>
                                        Booking ini tidak dapat di refund
                                    </span>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-start '>
                                    <FaCircleCheck
                                        className='' color='#0BC175' size='22'
                                    />
                                    <span className='font-bold text-black text-sm'>
                                        Dapat dijadwalkan ulang
                                    </span>
                                </div>
                                <div className='cursor-pointer'>
                                    <a className=" text-[#FF4D30]" onClick={openModal}>Lihat Detail</a>
                                    <Modal isOpen={isModalOpen} onClose={closeModal} />
                                </div>
                            </div>
                        </div>
                        <div className='w-full rounded-xl px-5 py-5 bg-white'>
                            <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                                <Label>
                                    <span className='font-extrabold text-black text-lg'>
                                        Detail Kontak
                                    </span>
                                </Label>
                                <span className='text-[#FF4D30] text-[14px]'>
                                    Harap isi semua kolom dengan benar untuk memastikan tidak ada kesalahan dalam booking
                                </span>
                            </div>
                            <div className='mt-10'>
                                <div className='flex flex-col gap-8 '>
                                    <div className='flex md:flex-row flex-col gap-5 w-full'>
                                        <div className='w-full flex flex-col gap-2'>
                                            <span className="text-black">
                                                Nama Lengkap <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Input
                                                label="Masukkan nama lengkap"
                                                value={nama_lengkap}
                                                onChange={(e) => setNamaLengkap(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='w-full flex flex-col gap-2'>
                                            <span className="text-black">
                                                Akun Sosmed <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Input
                                                label="Masukkan akun sosmed"
                                                value={akun_sosmed}
                                                onChange={(e) => setAkunSosmed(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='flex md:flex-row flex-col gap-5 '>
                                        <div className='w-full flex flex-col gap-2'>
                                            <span className="text-black">
                                                Email <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Input
                                                type='email'
                                                label="Masukkan email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='w-full flex flex-col gap-2'>
                                            <span className="text-black">
                                                Nomor Telepon <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Input
                                                type='number'
                                                label="Masukkan no telp"
                                                placeholder='08xxxxxxx'
                                                value={no_telp}
                                                onChange={(e) => setNoTelp(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <div className={`flex flex-row items-center cursor-pointer`}>
                                            <Checkbox
                                                checked={clickedPenyewaDiriSendiri}
                                                onChange={handleClickPenyewaDiriSendiri}
                                            />
                                            Diri Sendiri
                                        </div>
                                        <div className={`flex flex-row items-center cursor-pointer`}>
                                            <Checkbox
                                                checked={clickedPenyewaOrangLain}
                                                onChange={handleClickPenyewaOrangLain}
                                            />
                                            Orang Lain
                                        </div>
                                    </div>
                                    <span className='text-[#757575] text-[14px]'>
                                        Anda bisa memesan motor untuk orang lain dengan memilih opsi "Untuk Orang Lain"
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='hidden lg:flex flex-col rounded-xl px-5 py-5 items-center gap-3 bg-white'>
                            <Image src='/images/motor/dummy.png' alt='motor' width={259} height={183} />
                            <div className='flex flex-col gap-5 '>
                                <div className='flex flex-row gap-2 items-center '>
                                    <PiScroll className='' size='25' color='black' />
                                    <span className='font-bold text-black text-sm'>
                                        Kebijakan Pembatalan & Penjadwalan Ulang
                                    </span>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-start '>
                                    <MdCancel
                                        className='' color='grey' size='25'
                                    />
                                    <span className='font-bold text-black text-sm'>
                                        Booking ini tidak dapat di refund
                                    </span>
                                </div>
                                <div className='flex flex-row gap-2 items-center justify-start '>
                                    <FaCircleCheck
                                        className='' color='#0BC175' size='22'
                                    />
                                    <span className='font-bold text-black text-sm'>
                                        Dapat dijadwalkan ulang
                                    </span>
                                </div>
                                <div className='cursor-pointer'>
                                    <a className=" text-[#FF4D30]" onClick={openModal}>Lihat Detail</a>
                                    <Modal isOpen={isModalOpen} onClose={closeModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
                            <div className='flex flex-col items-start justify-start gap-3 text-[#666666] '>
                                <span className='font-extrabold text-black text-lg flex'>
                                    Detail Booking
                                </span>
                                <span className='text-[#FF4D30] text-[14px]'>
                                    Harap isi semua kolom dengan benar untuk memastikan tidak ada kesalahan dalam booking
                                </span>
                            </div>
                            <div className='mt-10 '>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-col md:flex-row gap-4'>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Nama Motor <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <div className='text-sm w-full max-w-[473px]'>
                                                {motors.length > 0 && (
                                                    <div className="w-full">
                                                        <Select
                                                            label='Pilih nama motor'
                                                            onChange={(value) => handleSelectChangeNamaMotor(value)}
                                                        >
                                                            {motors.map((motor) => (
                                                                <Option key={motor.id} value={motor.nama_motor}>
                                                                    {motor.nama_motor}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                )}
                                            </div>
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
                                                        label="Select a Date"
                                                        onChange={() => null}
                                                        value={tanggal_mulai ? format(new Date(tanggal_mulai), "yyyy-MM-dd") : ""}
                                                    />
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    <DayPicker
                                                        mode="single"
                                                        selected={tanggal_mulai ? new Date(tanggal_mulai) : undefined}
                                                        onSelect={handleDateStart}
                                                        showOutsideDays
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
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Tanggal Selesai <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Popover placement="bottom">
                                                <PopoverHandler>
                                                    <Input
                                                        required
                                                        label="Select a Date"
                                                        onChange={() => null}
                                                        value={tanggal_selesai ? format(new Date(tanggal_selesai), "yyyy-MM-dd") : ""}
                                                    />
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    <DayPicker
                                                        mode="single"
                                                        selected={tanggal_selesai ? new Date(tanggal_selesai) : undefined}
                                                        onSelect={handleDateEnd}
                                                        showOutsideDays
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
                                        <div className='text-black w-full text-sm'>
                                            Fasilitas
                                            <ul className="list-disc ml-5">
                                                <li>2 Helm</li>
                                                <li>2 Jas Hujan</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='text-black w-full'>
                                        <div className="grid w-full gap-1.5">
                                            <span className="text-black">
                                                Keperluan Menyewa <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Textarea
                                                label="Keperluan menyewa"
                                                value={keperluan_menyewa}
                                                onChange={(e) => setKeperluanMenyewa(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='text-black w-full'>
                                        <div className="grid w-full gap-1.5">
                                            <span className="text-black">
                                                Alamat <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Textarea
                                                label="Masukkan alamat"
                                                value={alamat}
                                                onChange={(e) => setAlamat(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-5'>
                                        <div className={`flex flex-row items-center cursor-pointer ${clickedAmbil ? 'clicked' : ''}`} onClick={handleClickAmbil}>
                                            <Checkbox
                                                checked={clickedAmbil}
                                                onChange={handleClickAmbil}
                                            />
                                            Diambil
                                        </div>
                                        <div className={`flex flex-row items-center cursor-pointer ${clickedDiantar ? 'clicked' : ''}`} onClick={handleClickDiantar}>
                                            <Checkbox
                                                checked={clickedDiantar}
                                                onChange={handleClickDiantar}
                                            />
                                            Diantar
                                        </div>
                                    </div>
                                    <div className={`text-black w-full ${clickedAmbil ? 'slide-in' : 'slide-out'}`}>
                                        <div className="grid w-full gap-1.5 mt-4">
                                            <Label>
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <IoMapSharp size='25' />
                                                    <span className='font-semibold text-sm'>
                                                        Lokasi Rental Motor
                                                    </span>
                                                </div>
                                            </Label>
                                            <Image src='/images/rentalmotormap.png' alt='map' width={1000} height={1000} className='w-full h-full max-h-[380px]' />
                                            <Label>
                                                <div className='flex flex-row gap-1 items-center mt-2'>
                                                    <IoLocationSharp size='25' color='red' />
                                                    <a href="https://maps.app.goo.gl/xFp83TkWAVgps3No7" target='_blank'>
                                                        <span className='font-semibold text-[#0194F3] text-sm hover:underline'>
                                                            Click Disini
                                                        </span>
                                                    </a>
                                                </div>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
                            <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                                <Label>
                                    <span className='font-extrabold text-black text-lg'>
                                        Kontak Darurat
                                    </span>
                                </Label>
                                <span className='text-[#FF4D30] text-[14px]'>
                                    Untuk mengatasi masalah seperti kecelakaan dibutuhkan kontak selain pemesan
                                </span>
                            </div>
                            <div className='mt-10'>
                                <div className='flex flex-col gap-8 '>
                                    <div className='flex md:flex-row flex-col gap-5 '>
                                        <div className='w-full flex flex-col gap-2'>
                                            <span className="text-black">
                                                Nama Kontak Darurat <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Input
                                                label="Masukkan nama kontak darurat"
                                                value={nama_kontak_darurat}
                                                onChange={(e) => setNamaKontakDarurat(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='w-full flex flex-col gap-2'>
                                            <span className="text-black">
                                                Nomor Kontak Darurat <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Input
                                                type='number'
                                                label="Masukkan nomor kontak darurat"
                                                value={nomor_kontak_darurat}
                                                onChange={(e) => setNomorKontakDarurat(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-5 '>
                                        <div className='w-full flex flex-col gap-2'>
                                            <span className="text-black">
                                                Hubungan Kontak Darurat <span className="text-[#FF4D33] font-semibold">*</span>
                                            </span>
                                            <Input
                                                label="Masukkan hubungan kontak darurat"
                                                value={hubungan_dengan_kontak_daruat}
                                                onChange={(e) => setHubunganDenganKontakDarurat(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
                            <div className='flex flex-col items-start justify-start gap-3 text-[#666666]'>
                                <Label>
                                    <span className='font-extrabold text-black text-lg'>
                                        Detail Harga
                                    </span>
                                </Label>
                                <span className='text-[#00875A] text-[14px]'>
                                    Gunakan kupon di halaman pembayaran untuk harga yang lebih murah
                                </span>
                            </div>
                            <div className='mt-10'>
                                <div className='flex flex-col gap-8 '>
                                    <div className='flex flex-col gap-5 '>
                                        <div className='flex flex-row gap-5 justify-between'>
                                            <Label>
                                                <span className='font-medium text-base'>
                                                    Harga Sewa
                                                </span>
                                            </Label>
                                            <Label>
                                                <span className='font-medium text-sm'>
                                                    Rp. {rentalPrice.toLocaleString()} (x{durasi})
                                                </span>
                                            </Label>
                                        </div>
                                        <div className='flex flex-row justify-between'>
                                            <Label>
                                                <span className='font-medium text-sm text-[#757575]'>
                                                    {nama_motor} ( {durasi} - Hari )
                                                </span>
                                            </Label>
                                            <Label>
                                                <span className='font-medium text-sm'>
                                                    Rp. {(rentalPrice * durasi).toLocaleString()}
                                                </span>
                                            </Label>
                                        </div>
                                        <div className='flex flex-row justify-end'>
                                            <div className='w-full max-w-[368px] flex flex-col gap-2'>
                                                <span className="text-black">
                                                    Diskon
                                                </span>
                                                {diskons.length > 0 && (
                                                    <div className="w-full">
                                                        <Select
                                                            label={`Pilih diskon`}
                                                            onChange={handleSelectChangeDiskon}
                                                        >
                                                            {diskons.map((id_diskon) => (
                                                                <Option key={id_diskon.id} value={id_diskon.id}>
                                                                    {id_diskon.nama_diskon}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex flex-row justify-end mt-2'>
                                            <Label>
                                                <span className='font-medium md:text-base text-xs'>
                                                    Rp. {total_pembayaran.toLocaleString()}
                                                </span>
                                            </Label>
                                        </div>
                                        <div className='flex flex-row gap-2 mt-2 items-center'>
                                            <Checkbox
                                                id="points"
                                                color='orange'
                                            />
                                            <div className='flex flex-row gap-1 items-center'>
                                                <AiOutlineDollarCircle color='#FF4D30' size='23px' />
                                                <Label>
                                                    <span className='font-medium text-[14px] text-[#FF4D30]'>
                                                        Gunakan Points
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="border-t border-[#757575] mt-2"></div>
                                        <div className='flex flex-row justify-between'>
                                            <Label>
                                                <span className='font-medium text-base'>
                                                    Total Harga
                                                </span>
                                            </Label>
                                            <Label>
                                                <span className='font-medium text-base text-[#FF4D30]'>
                                                    Rp. {total_pembayaran.toLocaleString()}
                                                </span>
                                            </Label>
                                        </div>
                                        <div className='flex flex-row gap-12 mt-2 '>
                                            <div className={`flex flex-row items-center cursor-pointer`}>
                                                <Checkbox
                                                    checked={clickedPaymentTunai}
                                                    onChange={handleClickPaymentTunai}
                                                />
                                                Tunai
                                            </div>
                                            <div className={`flex flex-row items-center cursor-pointer`}>
                                                <Checkbox
                                                    checked={clickedPaymentCashless}
                                                    onChange={handleClickPaymentCashless}
                                                />
                                                Cashless
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-1 mt-4 items-center max-w-[1005px] justify-center w-full'>
                            <MdOutlineTimer size='22px' color='#149CF3' />
                            <span className='text-[#149CF3] text-sm font-medium'>
                                Gunakan kupon di halaman pembayaran untuk harga yang lebih murah
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
                            <div className='flex flex-col gap-8'>
                                <Button
                                    type="submit"
                                    className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white shadow-md hover:shadow-lg bg-[#FF4D33] hover:bg-black active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Lanjut Pembayaran'}
                                </Button>
                            </div>
                            <div className='flex md:flex-row flex-col gap-1 px-5 mt-3 justify-center items-center'>
                                <Label>
                                    <span className='font-medium text-sm'>
                                        Dengan melanjutkan pembayaran, Anda telah menyetujui
                                    </span>
                                </Label>
                                <Label>
                                    <a className="cursor-pointer text-[#149CF3]" onClick={openTermsModal}>Syarat & Ketentuan <span className='text-black'>dan</span> Kebijakan Privasi</a>
                                </Label>
                                <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
                            </div>
                        </div>
                    </div>
                </form>
                {showNotification && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                        <span>Data berhasil dikirim</span>
                        <MdDone className="ml-2 text-white" />
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}