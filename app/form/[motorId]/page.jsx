'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { MdOutlineTimer, MdDone, MdClear } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import InvoicePopup from '@/components/sub/invoice';
import TermsModal from '@/components/sub/termsModal';
import Footer from '@/components/sub/main/Footer';
import Navbar from '@/components/sub/main/NavbarAfter';
import PemesananHeader from '@/components/sub/pemesananHeader';
import DetailKontak from '@/components/sub/detailContact';
import DetailPemesanan from '@/components/sub/detailPemesanan';
import DetailHarga from '@/components/sub/detailHarga';
import EmergencyContact from '@/components/sub/emergencyContact';
import KebijakanDetails from '@/components/sub/kebijakanReschedule';
import KebijakanDetails1 from '@/components/sub/kebijakanReschedule1';
import PrivacyModal from '@/components/sub/privacyPolicyModal';
import { fetchDetailMotor } from '@/utils/formService/motorService';
import { fetchMotor } from '@/utils/formService/motorService';
import { fetchDiskons } from '@/utils/formService/diskonService';
import { fetchUserPoint } from '@/utils/formService/userService';
import { handleBookingSubmit } from '@/utils/formService/bookingService';
import { fetchBookedDates } from '@/utils/formService/bookedDates';
import { fetchUserData, updateUserData } from '@/utils/services/userService';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

export default function page({ params: { motorId } }) {
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [pengguna_id, setPenggunaId] = useState('');
    const [disabledRanges, setDisabledRanges] = useState([]);
    const [disabledDays, setDisabledDays] = useState([]);
    const [disabledTimesPerDay, setDisabledTimesPerDay] = useState({});
    const [minEndDate, setMinEndDate] = useState(null);
    const [detailId, setDetailMotorId] = useState(motorId);
    const [hargaRental, setHargaRental] = useState(0);
    const [gambarMotor, setGambarMotor] = useState('');
    const [motors, setMotors] = useState([]);
    const [diskons, setDiskons] = useState([]);
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [nomor_hp, setNoTelp] = useState('');
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
    const [clickedAmbil, setClickedAmbil] = useState(true);
    const [clickedPenyewaDiriSendiri, setClickedPenyewaDiriSendiri] = useState(true);
    const [clickedPenyewaOrangLain, setClickedPenyewaOrangLain] = useState(false);
    const [clickedPaymentTunai, setClickedPaymentTunai] = useState(false);
    const [clickedPaymentCashless, setClickedPaymentCashless] = useState(false);
    const [durasi, setDurasi] = useState('');
    const [pointValue, setPointValue] = useState(0);
    const [showInvoice, setShowInvoice] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({});

    const token = Cookies.get('token');
    const router = useRouter();
    const id = Cookies.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await fetchUserData({ id, token });
                if (user) {
                    setUserData(user); // Store fetched data separately
                    setNamaLengkap(user.nama_lengkap);
                    setEmail(user.email);
                    setNoTelp(user.nomor_hp);  // Set the phone number state
                    setAkunSosmed(user.akun_sosmed);
                    setAlamat(user.alamat);
                    setUserId(user.id); // Set user ID
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, [token, id]);

    useEffect(() => {
        console.log(nomor_hp)
        if (nomor_hp?.startsWith('+62')) {
            setNoTelp(nomor_hp.slice(3)); 
        } else {
            setNoTelp(nomor_hp);
        }
    }, [nomor_hp]);
    

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
        const fetchData = async () => {
            const { error, data } = await fetchDetailMotor(detailId, token);
            if (error) {
                setError(error);
            } else {
                setGambarMotor(data);
                setStokMotor(data.stok_motor);
                console.log('Stok Motor:', data.stok_motor);
            }
        };

        fetchData();
    }, [detailId, token]);

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await fetchMotor(token);
            if (error) {
                setError(error);
            } else {
                setMotors(data);
                console.log('Fetched motor:', data);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await fetchDiskons(token);
            if (error) {
                setError(error);
            } else {
                const today = dayjs().format('YYYY-MM-DD');
                const filteredDiskons = data.filter(diskon => {
                    const startDate = dayjs(diskon.tanggal_mulai).format('YYYY-MM-DD');
                    const endDate = dayjs(diskon.tanggal_selesai).format('YYYY-MM-DD');
                    const isWithinStartDate = dayjs(today).isSameOrAfter(startDate);
                    const isNotExpired = dayjs(today).isBefore(endDate);
                    return isWithinStartDate && isNotExpired;
                });
                setDiskons(filteredDiskons);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await fetchUserPoint(id, token);
            if (error) {
                setError(error);
            } else {
                setPoint(data);
            }
        };
        fetchData();
    }, [id, token]);

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

    const formatPhoneNumber = (phone) => {
        if (!phone.startsWith('+62')) {
            return '+62' + phone.replace(/^0+/, '');
        }
        return phone;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (clickedPenyewaDiriSendiri && userId) {
            try {
                await updateUserData(userId, token, { nama_lengkap, nomor_hp, alamat });
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }

        const bookingData = {
            pengguna_id: id,
            nama_lengkap,
            email,
            nomor_hp: formatPhoneNumber(nomor_hp),
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
            nomor_kontak_darurat: formatPhoneNumber(nomor_kontak_darurat),
            hubungan_dengan_kontak_darurat,
            diskon_id,
            metode_pembayaran,
            total_pembayaran,
            point,
            usePoint,
        };

        await handleBookingSubmit(bookingData, token, router, setLoading, showNotificationWithTimeout, updateHistoryStatus, submitForm, setResponse, id);
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

        if (nama_kontak_darurat.trim().toLowerCase() === nama_lengkap.trim().toLowerCase()) {
            showNotificationWithTimeout('Nama kontak darurat tidak boleh sama dengan nama pemesan', 'error');
            return;
        }

        if (nomor_kontak_darurat.trim().toLowerCase() === nomor_hp.trim().toLowerCase()) {
            showNotificationWithTimeout('Nomor kontak darurat tidak boleh sama dengan nomor hp pemesan', 'error');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    pengguna_id: id,
                    nama_lengkap,
                    email,
                    nomor_hp: formatPhoneNumber(nomor_hp),
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
                    nomor_kontak_darurat: formatPhoneNumber(nomor_kontak_darurat),
                    hubungan_dengan_kontak_darurat,
                    diskon_id,
                    metode_pembayaran,
                    total_pembayaran,
                    status_history: 'Menunggu Pembayaran',
                }),
            });

            if (!response.ok) {
                throw new Error('Network Error');
            }

            if (!response === 422) {
                showNotificationWithTimeout('Data yang dimasukkan tidak valid', 'error');
                return;
            }

            const data = await response.json();
            setResponse(data);
            const historyId = data.history.id;

            const invoiceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invoice/create/${historyId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!invoiceResponse.ok) {
                throw new Error('Failed to create invoice');
            }

            const invoiceData = await invoiceResponse.json();
            Cookies.set('orderIdTunai', invoiceData.order_id);

            if (usePoint) {
                const pointsToUse = Math.min(point, total_pembayaran);
                const pointResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ point: point - pointsToUse }),
                });

                if (!pointResponse.ok) {
                    throw new Error('Failed to update points');
                }
            }

            showNotificationWithTimeout(successMessage, 'success');
            router.push('/setting?component=history');
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
            const motor = motors.find((m) => m.id === parseInt(motorId, 10));
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
        const getBookedDates = async () => {
            try {
                const { disabledDays, disabledTimesPerDay } = await fetchBookedDates(motor_id, token, stok_motor);
                setDisabledDays(disabledDays);
                setDisabledTimesPerDay(disabledTimesPerDay);
            } catch (error) {
                console.error('Failed to fetch booked dates:', error);
            }
        };

        getBookedDates();
    }, [motor_id, token, stok_motor]);

    const shouldDisableDate = (date) => {
        const today = dayjs().startOf('day');
        if (date.isBefore(today)) return true;

        const dateStr = date.format('YYYY-MM-DD');
        return disabledDays.includes(dateStr);
    };

    const shouldDisableTime = (time, selectedDate) => {
        if (!selectedDate) return false;

        const now = dayjs();
        const dateStr = selectedDate.format('YYYY-MM-DD');
        const timeStr = selectedDate.set('hour', time.hour()).set('minute', time.minute()).format('YYYY-MM-DD HH:mm:ss');

        if (selectedDate.isSame(now, 'day') && time.isBefore(now.add(2, 'hour'), 'minute')) {
            return true;
        }

        const bookedTimes = Array.from(disabledTimesPerDay[dateStr] || []);
        for (let bookedTimeStr of bookedTimes) {
            const bookedTime = dayjs(bookedTimeStr);
            const startBuffer = bookedTime.subtract(2, 'hour');
            const endBuffer = bookedTime.add(2, 'hour');
            if (time.isBetween(startBuffer, endBuffer, null, '[)')) {
                return true;
            }
        }

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

    useEffect(() => {
        if (clickedPenyewaDiriSendiri === true) {
            setPenyewa('Diri Sendiri');
        } else {
            setPenyewa('Orang Lain');
        }
    });

    const handleClickPenyewaDiriSendiri = () => {
        setClickedPenyewaDiriSendiri(true);
        setClickedPenyewaOrangLain(false);
        setPenyewa('Diri Sendiri');

        setNamaLengkap(userData.nama_lengkap);
        setNoTelp(userData.nomor_hp);
        setAkunSosmed(userData.akun_sosmed);
        setEmail(userData.email);
        setAlamat(userData.alamat);
    };

    const handleClickPenyewaOrangLain = () => {
        setClickedPenyewaOrangLain(true);
        setClickedPenyewaDiriSendiri(false);
        setPenyewa('Orang Lain');

        setNamaLengkap('');
        setNoTelp('');
        setAkunSosmed('');
        setEmail('');
        setAlamat('');
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

    useEffect(() => {
        if (clickedAmbil === true) {
            setPenerimaanMotor('Diambil');
        } else {
            setPenerimaanMotor('Diantar');
        }
    })

    const handleClickDiantar = () => {
        setClickedDiantar(true);
        setClickedAmbil(false);
        setPenerimaanMotor('Diantar');
    };

    const handleClickAmbil = () => {
        setClickedAmbil(true);
        setClickedDiantar(false);
        setPenerimaanMotor('Diambil');
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);

    const openTermsModal = () => setIsTermsModalOpen(true);
    const closeTermsModal = () => setIsTermsModalOpen(false);

    const openPrivacyModal = () => setPrivacyModalOpen(true);
    const closePrivacyModal = () => setPrivacyModalOpen(false);

    // const selectIcon = (icon) => {
    //     setSelectedIcon(icon);
    //     setShowDropdown(false);
    // };

    if (!motors) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
            </div>
        );
    }

    return (
        <>
            <div className="lg:mx-view-pc">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-1.5 ml-5 lg:ml-0 cursor-pointer">
                            <Image src='/images/logo.png' alt='Logo' width='38' height='38' />
                            <Label>
                                <span className='font-bold'>Rental Motor Kudus</span>
                            </Label>
                        </Link>
                    </div>
                    <div className="flex items-center mr-3">
                        <Link href="/" className={'text-gray-700 hover:text-[#FF4D30]'}>Kembali</Link>
                    </div>
                </div>
            </div>
            <div className='h-full w-full px-5 py-5 md:px-24 md:py-16 bg-[#F6F7F9]'>
                <PemesananHeader />
                <form method="post" action="post" onSubmit={handleSubmit}>
                    <div className='flex lg:flex-row flex-col gap-5'>
                        <KebijakanDetails1
                            gambarMotor={gambarMotor}
                            openModal={openModal}
                            isModalOpen={isModalOpen}
                            closeModal={closeModal}
                        />
                        <DetailKontak
                            nama_lengkap={nama_lengkap}
                            setNamaLengkap={setNamaLengkap}
                            akun_sosmed={akun_sosmed}
                            setAkunSosmed={setAkunSosmed}
                            email={email}
                            setEmail={setEmail}
                            nomor_hp={nomor_hp}
                            setNoTelp={setNoTelp}
                            clickedPenyewaDiriSendiri={clickedPenyewaDiriSendiri}
                            handleClickPenyewaDiriSendiri={handleClickPenyewaDiriSendiri}
                            clickedPenyewaOrangLain={clickedPenyewaOrangLain}
                            handleClickPenyewaOrangLain={handleClickPenyewaOrangLain}
                        />
                        <KebijakanDetails
                            gambarMotor={gambarMotor}
                            openModal={openModal}
                            isModalOpen={isModalOpen}
                            closeModal={closeModal}
                        />
                    </div>
                    <DetailPemesanan
                        motors={motors}
                        selectedMotor={selectedMotor}
                        handleSelectChangeNamaMotor={handleSelectChangeNamaMotor}
                        tanggal_mulai={tanggal_mulai}
                        handleDateStart={handleDateStart}
                        shouldDisableDate={shouldDisableDate}
                        shouldDisableTime={shouldDisableTime}
                        tanggal_selesai={tanggal_selesai}
                        handleDateEnd={handleDateEnd}
                        minEndDate={minEndDate}
                        durasi={durasi}
                        keperluan_menyewa={keperluan_menyewa}
                        setKeperluanMenyewa={setKeperluanMenyewa}
                        alamat={alamat}
                        setAlamat={setAlamat}
                        clickedAmbil={clickedAmbil}
                        handleClickAmbil={handleClickAmbil}
                        clickedDiantar={clickedDiantar}
                        handleClickDiantar={handleClickDiantar}
                    />
                    <EmergencyContact
                        nama_kontak_darurat={nama_kontak_darurat}
                        nama_lengkap={nama_lengkap}
                        nomor_kontak_darurat={nomor_kontak_darurat}
                        setNamaKontakDarurat={setNamaKontakDarurat}
                        nomor_hp={nomor_hp}
                        setNomorKontakDarurat={setNomorKontakDarurat}
                        hubungan_dengan_kontak_darurat={hubungan_dengan_kontak_darurat}
                        setHubunganDenganKontakDarurat={setHubunganDenganKontakDarurat}
                    />
                    <DetailHarga
                        hargaRental={hargaRental}
                        durasi={durasi}
                        nama_motor={selectedMotor}
                        usePoint={usePoint}
                        handleCheckboxChange={handleCheckboxChange}
                        point={point}
                        pointValue={pointValue}
                        diskons={diskons}
                        handleSelectChangeDiskon={handleSelectChangeDiskon}
                        total_pembayaran={total_pembayaran}
                        clickedPaymentTunai={clickedPaymentTunai}
                        handleClickPaymentTunai={handleClickPaymentTunai}
                        clickedPaymentCashless={clickedPaymentCashless}
                        handleClickPaymentCashless={handleClickPaymentCashless}
                    />
                    <div className='flex flex-row gap-1 mt-4 items-center max-w-[1005px] justify-center w-full'>
                        <MdOutlineTimer size='22px' color='#149CF3' />
                        <span className='text-[#149CF3] text-sm font-medium'>
                            Gunakan diskon di halaman pembayaran untuk harga yang lebih murah
                        </span>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='w-full max-w-[1005px] rounded-xl mt-5 px-5 py-5 bg-white'>
                            <div className='flex flex-col gap-2'>
                                <Button
                                    type="submit"
                                    className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white shadow-md hover:shadow-lg bg-[#FF4D33] hover:bg-black active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Lanjut Pembayaran'}
                                </Button>
                                <div className='flex md:flex-row flex-col gap-1 px-5 mt-3 justify-center items-center'>
                                    <Label>
                                        <span className='font-medium text-sm'>
                                            Dengan melanjutkan pembayaran, Anda telah menyetujui
                                        </span>
                                    </Label>
                                    <Label>
                                        <a className="cursor-pointer text-[#149CF3]" onClick={openTermsModal}>Syarat & Ketentuan</a> <span className='text-black'>dan</span>
                                        <a className="cursor-pointer text-[#149CF3]" onClick={openPrivacyModal}> Kebijakan Privasi</a>
                                    </Label>

                                    <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
                                    <PrivacyModal isOpen={isPrivacyModalOpen} onClose={closePrivacyModal} />
                                </div>
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