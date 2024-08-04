'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { PiScroll } from "react-icons/pi";
import { MdCancel, MdOutlineTimer } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoLocationSharp, IoMapSharp } from "react-icons/io5";
import { MdDone, MdClear } from 'react-icons/md';

import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import {
    Input,
    Select,
    Textarea,
    Option,
    Radio,
} from "@material-tailwind/react";

import InvoicePopup from '@/components/sub/invoice';
import Modal from '@/components/sub/rescheduleFormModal';
import TermsModal from '@/components/sub/termsModal';
import Footer from '@/components/main/Footer';
import Navbar from '@/components/main/NavbarAfter';
import Lokasi from '@/components/sub/about/Lokasi';

import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export default function page({ params: { motorId } }) {
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [pengguna_id, setPenggunaId] = useState('');
    const [disabledRanges, setDisabledRanges] = useState([]);
    const [minEndDate, setMinEndDate] = useState(null);
    const [detailId, setDetailMotorId] = useState(motorId);
    const [hargaRental, setHargaRental] = useState(0);
    const [gambarMotor, setGambarMotor] = useState('');
    const [motors, setMotors] = useState([]);
    const [diskons, setDiskons] = useState([]);
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [no_telp, setNoTelp] = useState('');
    const [akun_sosmed, setAkunSosmed] = useState('');
    const [alamat, setAlamat] = useState('');
    const [penyewa, setPenyewa] = useState('');
    const [motor_id, setMotorId] = useState('');
    const [stok_motor, setStokMotor] = useState(0);
    const [nama_motor, setNamaMotor] = useState('');
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [keperluan_menyewa, setKeperluanMenyewa] = useState('');
    const [penerimaan_motor, setPenerimaanMotor] = useState('');
    const [nama_kontak_darurat, setNamaKontakDarurat] = useState('');
    const [nomor_kontak_darurat, setNomorKontakDarurat] = useState('');
    const [hubungan_dengan_kontak_darurat, setHubunganDenganKontakDarurat] = useState('');
    const [diskon_id, setDiskonId] = useState(diskons.length > 0 ? diskons[0].id : null);
    const [metode_pembayaran, setMetodePembayaran] = useState('');
    const [point, setPoint] = useState(0);
    const [usePoint, setUsePoint] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [clickedDiantar, setClickedDiantar] = useState(false);
    const [clickedAmbil, setClickedAmbil] = useState(false);
    const [clickedPenyewaDiriSendiri, setClickedPenyewaDiriSendiri] = useState(false);
    const [clickedPenyewaOrangLain, setClickedPenyewaOrangLain] = useState(false);
    const [clickedPaymentTunai, setClickedPaymentTunai] = useState(false);
    const [clickedPaymentCashless, setClickedPaymentCashless] = useState(false);
    const [durasi, setDurasi] = useState('');
    const [pointValue, setPointValue] = useState(0);
    const [showInvoice, setShowInvoice] = useState(false);
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    useEffect(() => {
        const penggunaIdFromCookie = Cookies.get('pengguna_id');
        if (penggunaIdFromCookie) {
            setPenggunaId(penggunaIdFromCookie);
        }
    }, []);

    useEffect(() => {
        calculateTotalPembayaran();
    }, [hargaRental, durasi, usePoint, diskon_id]);

    const calculateTotalPembayaran = () => {
        let totalPriceWithoutDiscount = hargaRental * durasi;

        if (diskon_id) {
            const selectedDiskon = diskons.find((diskon) => diskon.id === diskon_id);
            if (selectedDiskon) {
                const potonganHargaPercentage = selectedDiskon.potongan_harga;
                const discountAmount = (totalPriceWithoutDiscount * potonganHargaPercentage) / 100;
                totalPriceWithoutDiscount -= discountAmount;
            }
        }

        if (usePoint) {
            totalPriceWithoutDiscount -= point;
        }

        setTotalPembayaran(Math.round(totalPriceWithoutDiscount));
        return Math.round(totalPriceWithoutDiscount);
    };

    const handleSelectChangeDiskon = (selectedValue) => {
        if (selectedValue) {
            setDiskonId(selectedValue);
        }
    };

    const handleCheckboxChange = () => {
        const isChecked = !usePoint;
        const updatedTotal = calculateTotalPembayaran(isChecked);

        if (updatedTotal === 0) {
            setUsePoint(false);
            setPointValue(0);
            showNotificationWithTimeout('Silahkan isi data terlebih dahulu', 'error');
            scrollToTarget();
        } else {
            if (usePoint) {
                setUsePoint(false);
                setPointValue(0);
            } else {
                setUsePoint(isChecked);
                setPointValue(point);
            }
        }
    };

    const scrollToTarget = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [total_pembayaran, setTotalPembayaran] = useState(hargaRental * durasi);

    useEffect(() => {
        if (!detailId) return;
        const fetchDetailMotor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${detailId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched motor:', data);
                    setGambarMotor(data.listMotor);
                    setStokMotor(data.listMotor.stok_motor);
                    console.log('Stok Motor:', data.listMotor.stok_motor);
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };
        fetchDetailMotor();
    }, [detailId]);

    useEffect(() => {
        const fetchMotor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched motor:', data);
                    setMotors(data.listMotor || []);
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
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched discount:', data);
                    setDiskons(data.diskon || []);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchPoint = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    setPoint(data.user.point);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchPoint();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use pengguna_id in your API request or logic
        console.log('Pengguna ID:', pengguna_id);

        if (metode_pembayaran === 'Tunai') {
            await submitForm('Booking berhasil');
        } else {
            setLoading(true);

            try {
                const historyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        pengguna_id: id,
                        nama_lengkap,
                        email,
                        no_telp,
                        akun_sosmed,
                        alamat,
                        penyewa,
                        motor_id,
                        tanggal_mulai,
                        tanggal_selesai,
                        durasi,
                        keperluan_menyewa,
                        penerimaan_motor,
                        nama_kontak_darurat,
                        nomor_kontak_darurat,
                        hubungan_dengan_kontak_darurat,
                        diskon_id,
                        metode_pembayaran,
                        total_pembayaran,
                        status_history: 'Menunggu Pembayaran',
                    }),
                });

                if (!historyResponse.ok) {
                    const errorText = await historyResponse.text();
                    console.error('Failed to create history:', errorText);
                    throw new Error(`Failed to create history: ${errorText}`);
                }

                const historyData = await historyResponse.json();
                const historyId = historyData.history.id;
                console.log('History Data:', historyData);

                const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/${historyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!paymentResponse.ok) {
                    const errorText = await paymentResponse.text();
                    console.error('Failed to get payment details:', errorText);
                    throw new Error(`Failed to get payment details: ${errorText}`);
                }

                const paymentData = await paymentResponse.json();
                const snapToken = paymentData.snapToken;
                const orderId = paymentData.order_id;
                console.log(`Snap Token: ${snapToken}, Order ID: ${historyId}`);

                if (!snapToken || !historyId) {
                    throw new Error('Snap Token or Order ID missing in the response');
                }

                window.snap.pay(snapToken, {
                    onSuccess: async function (result) {
                        showNotificationWithTimeout('Pembayaran berhasil!', 'success');
                        console.log('Payment Success:', result);
                        await updateHistoryStatus(historyData.history.id, 'Dipesan');

                        try {
                            const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-invoice/${orderId}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                    status_history: 'Dipesan',
                                    status_pembayaran: 'Lunas',
                                }),
                            });

                            if (!updateResponse.ok) {
                                throw new Error('Failed to update invoice status');
                            }

                            const updateData = await updateResponse.json();
                            console.log('Invoice status update response:', updateData);

                        } catch (error) {
                            console.error('Error updating invoice status:', error);
                        }

                        if (usePoint) {
                            const pointsToUse = Math.min(point, total_pembayaran);
                            try {
                                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${id}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({ point: point - pointsToUse }),
                                });

                                if (!response.ok) {
                                    throw new Error('Failed to update points');
                                }

                                console.log(`Points updated successfully: ${point} - ${pointsToUse} for user ${id}`);
                            } catch (error) {
                                console.error('Error updating points:', error);
                            }
                        }
                        setShowInvoice(true);
                    },
                    onPending: async function (result) {
                        showNotificationWithTimeout('Menunggu pembayaran Anda.', 'info');
                        console.log('Payment Pending:', result);

                        await updateHistoryStatus(historyData.history.id, 'Menunggu Pembayaran');
                    },
                    onError: async function (result) {
                        showNotificationWithTimeout('Pembayaran dibatalkan.', 'error');
                        console.log('Payment Error:', result);

                        await updateHistoryStatus(historyData.history.id, 'Dibatalkan');
                    },
                    onClose: async function () {
                        showNotificationWithTimeout('Anda menutup popup tanpa menyelesaikan pembayaran.', 'warning');
                        console.log('Payment Popup Closed');

                        await updateHistoryStatus(historyData.history.id, 'Dibatalkan');
                    }
                });

            } catch (error) {
                showNotificationWithTimeout('Terjadi kesalahan saat mengirim data.', 'error');
                console.error('Error:', error);
                setResponse({ message: 'Terjadi kesalahan saat mengirim data.', error: error.message });
            } finally {
                setLoading(false);
            }
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

    const submitForm = async (successMessage) => {
        if (tanggal_mulai && tanggal_selesai) {
            const startDate = dayjs(tanggal_mulai);
            const endDate = dayjs(tanggal_selesai);
            const duration = endDate.diff(startDate, 'day');
            setDurasi(duration);
        } else {
            setDurasi(0);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nama_lengkap,
                    email,
                    no_telp,
                    akun_sosmed,
                    alamat,
                    penyewa,
                    motor_id,
                    tanggal_mulai,
                    durasi,
                    tanggal_selesai,
                    keperluan_menyewa,
                    penerimaan_motor,
                    nama_kontak_darurat,
                    nomor_kontak_darurat,
                    hubungan_dengan_kontak_darurat,
                    diskon_id,
                    metode_pembayaran,
                    total_pembayaran,
                    status_history: 'Dipesan',
                }),
            });

            if (!response.ok) {
                throw new Error('Network Error');
            }

            const data = await response.json();
            console.log('Success', data);
            setResponse(data);

            showNotificationWithTimeout(successMessage, 'success');

            // router.push(`/payment-success?order_id=${data.id}`);
        } catch (error) {
            setResponse({ message: 'Terjadi kesalahan saat mengirim data.', error: error.message });
        } finally {
            setLoading(false);
        }
    };

    const updateHistoryStatus = async (id, status) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    status_history: status,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update history status');
            }

            const data = await response.json();
            console.log('History status update:', data);
        } catch (error) {
            console.error('Error updating history status:', error);
        }
    };

    const showNotificationWithTimeout = (message, type, timeout = 3000) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, timeout);
    };

    useEffect(() => {
        if (motorId && motors.length > 0) {
            const motor = motors.find((m) => m.id === parseInt(motorId, 10)); // Ensure both are numbers
            if (motor) {
                setSelectedMotor(motor.nama_motor);
                setMotorId(motor.id);
                setDetailMotorId(motor.id);
                setHargaRental(motor.harga_motor_per_1_hari);
                setNamaMotor(motor.nama_motor);
                setTanggalMulai('');
                setTanggalSelesai('');
            }
        }
    }, [motorId, motors]);

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

    const handleSelectChangeNamaMotor = (selectedValue) => {
        setSelectedMotor(selectedValue);
        if (selectedValue) {
            const selectedMotor = motors.find((motor) => motor.nama_motor === selectedValue);
            if (selectedMotor) {
                setDetailMotorId(selectedMotor.id);
                setMotorId(selectedMotor.id);
                setHargaRental(selectedMotor.harga_motor_per_1_hari);
                setNamaMotor(selectedMotor.nama_motor);
                setTanggalMulai('');
                setTanggalSelesai('');
            }
        }
    };

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
        setMetodePembayaran('Non-Tunai');
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
    };

    const closeTermsModal = () => {
        setIsTermsModalOpen(false);
    };

    if (!motors) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='h-full w-full px-5 py-5 md:px-24 md:py-16 bg-[#F6F7F9]'>
                <div className='text-[#666666] mb-5'>
                    <span className='font-semibold text-black md:text-xl text-base flex'>
                        Pemesanan
                    </span>
                    <span className='text-sm md:text-base'>
                        Pastikan semua detail pada halaman ini sudah benar sebelum melanjutkan ke pembayaran.
                    </span>
                </div>
                <form method="post" action="post" onSubmit={handleSubmit}>
                    <div className='flex lg:flex-row flex-col gap-5'>
                        <div className='flex lg:hidden flex-col rounded-xl mt-14 px-5 py-5 items-center gap-3 bg-white'>
                            <div className="w-[259px] h-[183px] relative">
                                {gambarMotor && (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${gambarMotor.gambar_motor}`}
                                        alt={gambarMotor.nama_motor}
                                        layout="fill"
                                        objectFit="cover"
                                        className="absolute inset-0"
                                    />
                                )}
                            </div>
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
                                                Akun Sosial Media <span className="text-[#FF4D33] font-semibold">*</span>
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
                                            <Radio
                                                checked={clickedPenyewaDiriSendiri}
                                                onChange={handleClickPenyewaDiriSendiri}
                                            />
                                            Diri Sendiri
                                        </div>
                                        <div className={`flex flex-row items-center cursor-pointer`}>
                                            <Radio
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
                            <div className="w-[200px] h-[150px] relative">
                                {gambarMotor && (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${gambarMotor.gambar_motor}`}
                                        alt={gambarMotor.nama_motor}
                                        layout="fill"
                                        objectFit="cover"
                                        className="absolute inset-0"
                                    />
                                )}
                            </div>
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
                                                    <Select
                                                        label="Pilih nama motor"
                                                        value={selectedMotor} // Ensure value is set
                                                        onChange={(value) => handleSelectChangeNamaMotor(value)}
                                                    >
                                                        {motors.map((motor) => (
                                                            <Option
                                                                key={motor.id}
                                                                value={motor.nama_motor}
                                                                disabled={motor.status_motor !== 'Tersedia'}
                                                                className={motor.status_motor !== 'Tersedia' ? 'cursor-not-allowed' : ''}
                                                            >
                                                                <div className="flex items-center">
                                                                    <Image
                                                                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${motor.gambar_motor}`}
                                                                        alt={motor.nama_motor}
                                                                        width={40}
                                                                        height={40}
                                                                        className="w-10 h-10 rounded-full mr-2"
                                                                    />
                                                                    <span>{motor.nama_motor}</span>
                                                                </div>
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </div>
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
                                            <Radio
                                                checked={clickedAmbil}
                                                onChange={handleClickAmbil}
                                            />
                                            Diambil
                                        </div>
                                        <div className={`flex flex-row items-center cursor-pointer ${clickedDiantar ? 'clicked' : ''}`} onClick={handleClickDiantar}>
                                            <Radio
                                                checked={clickedDiantar}
                                                onChange={handleClickDiantar}
                                            />
                                            Diantar
                                        </div>
                                    </div>
                                    <div className={`text-black w-full ${clickedAmbil ? 'slide-in' : 'slide-out'}`}>
                                        <div className='relative'>
                                            <div className='mt-5 mb-6'>
                                                <p className="text-black text-2xl font-bold text-center">Lokasi Kami</p>
                                            </div>
                                            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.872378039436!2d110.89978167475574!3d-6.785381493211696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70db4255192741%3A0x6e1d151b0d52676c!2sSewa%20Motor%20Kudus!5e0!3m2!1sid!2sid!4v1722223502208!5m2!1sid!2sid"
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    allowFullScreen=""
                                                    loading="eager"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                ></iframe>
                                            </div>
                                            <Label>
                                                <div className='flex flex-row gap-1 items-center mt-4 mb-10'>
                                                    <IoLocationSharp size='30' color='red' />
                                                    <Link href="https://maps.app.goo.gl/xFp83TkWAVgps3No7" target='_blank'>
                                                        <span className='font-semibold text-[#0194F3] text-base hover:underline'>
                                                            Trengguluh, Honggosoco, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah
                                                        </span>
                                                    </Link>
                                                </div>
                                            </Label>
                                        </div>
                                    </div>
                                    <div className={`${clickedDiantar ? 'slide-in' : 'slide-out'}`}>
                                        <span className='text-[#ff4d30]'>Biaya Pengantaran Rp 25.000</span>
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
                                                value={hubungan_dengan_kontak_darurat}
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
                                                    Rp. {hargaRental.toLocaleString()} (x{durasi})
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
                                                    Rp. {(hargaRental * durasi).toLocaleString()}
                                                </span>
                                            </Label>
                                        </div>
                                        <div className='flex flex-row gap-2 mt-2 items-center justify-between'>
                                            <div className='flex gap-2 items-center'>
                                                <input
                                                    type="checkbox"
                                                    id="points"
                                                    checked={usePoint}
                                                    onChange={handleCheckboxChange}
                                                    className={`custom-checkbox h-5 w-5 rounded-full border-2 border-orange-600 text-orange-600 transition duration-150 ease-in-out cursor-pointer`}
                                                    style={{
                                                        appearance: 'none',
                                                        WebkitAppearance: 'none',
                                                        MozAppearance: 'none'
                                                    }}
                                                />
                                                <div className='flex flex-row gap-1 items-center'>
                                                    <AiOutlineDollarCircle color='#FF4D30' size='23px' />
                                                    <Label>
                                                        <span className='font-medium text-[14px] text-[#FF4D30]'>
                                                            {point} Gunakan Poin
                                                        </span>
                                                    </Label>
                                                </div>
                                            </div>
                                            <div>
                                                <Label>
                                                    <span className='font-medium text-[14px] text-[#FF4D30]'>
                                                        -Rp. {pointValue}
                                                    </span>
                                                </Label>
                                            </div>
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
                                                            value={diskons[0].id}
                                                        >
                                                            {diskons.map((diskon) => {
                                                                const potonganRupiah = (hargaRental * durasi * diskon.potongan_harga) / 100;
                                                                return (
                                                                    <Option key={diskon.id} value={diskon.id}>
                                                                        {diskon.nama_diskon} - Potongan: Rp. {potonganRupiah.toLocaleString()}
                                                                    </Option>
                                                                );
                                                            })}
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
                                                <Radio
                                                    checked={clickedPaymentTunai}
                                                    onChange={handleClickPaymentTunai}
                                                />
                                                Tunai
                                            </div>
                                            <div className={`flex flex-row items-center cursor-pointer`}>
                                                <Radio
                                                    checked={clickedPaymentCashless}
                                                    onChange={handleClickPaymentCashless}
                                                />
                                                Non-Tunai
                                            </div>
                                        </div>
                                        {clickedPaymentTunai && (
                                            <span className='text-[#FF4D33]'>Booking dengan pembayaran tunai hanya bisa dilakukan hari ini!</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-1 mt-4 items-center max-w-[1005px] justify-center w-full'>
                            <MdOutlineTimer size='22px' color='#149CF3' />
                            <span className='text-[#149CF3] text-sm font-medium'>
                                Gunakan diskon di halaman pembayaran untuk harga yang lebih murah
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
                {showInvoice && (
                    <InvoicePopup onClose={() => setShowInvoice(false)} />
                )}
                {showNotification && (
                    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${notificationType === 'success' ? 'bg-green-500' : notificationType === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white py-2 px-4 rounded-md flex items-center shadow-lg z-50`}>
                        <span>{notificationMessage}</span>
                        {notificationType === 'success' ? <MdDone className="ml-2 text-white" /> : <MdClear className="ml-2 text-white" />}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}