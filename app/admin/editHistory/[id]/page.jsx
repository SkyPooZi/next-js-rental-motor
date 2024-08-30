'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { MdDone } from "react-icons/md";

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";
import Loading from '@/components/ui/loading';
import EditHistoryForm from '@/components/sub/editHistory';
import { fetchMotor } from '@/utils/services/motorsService';
import { fetchDiscounts } from '@/utils/services/fetchDicounts';
import { fetchHistoryDetail } from '@/utils/services/fetchDetailHistory';
import { EditHistory } from '@/utils/services/fetchEditHistory';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const Page = ({ params: { id } }) => {
    const [motors, setMotors] = useState([]);
    const [diskons, setDiskons] = useState([]);
    const [history, setHistory] = useState(null);
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [nomor_hp, setNomorHp] = useState('');
    const [akun_sosmed, setAkunSosmed] = useState('');
    const [alamat, setAlamat] = useState('');
    const [penyewa, setPenyewa] = useState('');
    const [motor_id, setMotorId] = useState('');
    const [detailId, setDetailMotorId] = useState(motor_id);
    const [hargaRental, setHargaRental] = useState(0);
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [minEndDate, setMinEndDate] = useState(null);
    const [keperluan_menyewa, setKeperluan] = useState('');
    const [penerimaan_motor, setPenerimaan] = useState('');
    const [nama_kontak_darurat, setNamaKontakDarurat] = useState('');
    const [nomor_kontak_darurat, setNomorKontakDarurat] = useState('');
    const [hubungan_dengan_kontak_darurat, setHubunganKontakDarurat] = useState('');
    const [id_diskon, setDiskon] = useState('');
    const [metode_pembayaran, setMetodePembayaran] = useState('');
    const [status_history, setStatusHistory] = useState('');
    const [selectedMotor, setSelectedMotor] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [durasi, setDurasi] = useState('');
    const [loadData, setLoadData] = useState(true);
    const token = Cookies.get('token');

    useEffect(() => {
        calculateTotalPembayaran();
    }, [hargaRental, durasi, id_diskon]);

    const calculateTotalPembayaran = () => {
        let totalPriceWithoutDiscount = hargaRental * durasi;

        if (id_diskon) {
            const selectedDiskon = diskons.find((diskon) => diskon.id === id_diskon);
            if (selectedDiskon) {
                const potonganHargaPercentage = selectedDiskon.potongan_harga;
                const discountAmount = (totalPriceWithoutDiscount * potonganHargaPercentage) / 100;
                totalPriceWithoutDiscount -= discountAmount;
            }
        }

        setTotalPembayaran(Math.round(totalPriceWithoutDiscount));
        return Math.round(totalPriceWithoutDiscount);
    };

    const handleSelectChangeDiskon = (value) => {
        setDiskon(value);
    }

    const [total_pembayaran, setTotalPembayaran] = useState(hargaRental * durasi);

    const handleSelectChangeNamaMotor = (value) => {
        setSelectedMotor(value);
        console.log(value);

        if (value) {
            const selectedMotor = motors.find((motor) => motor.id === value);
            if (selectedMotor) {
                setDetailMotorId(selectedMotor.id);
                setMotorId(selectedMotor.id);
                setHargaRental(selectedMotor.harga_motor_per_1_hari);
            }
        }
    };

    useEffect(() => {
        if (tanggal_mulai && tanggal_selesai) {
            const startDate = dayjs(tanggal_mulai);
            const endDate = dayjs(tanggal_selesai);
            const duration = endDate.diff(startDate, 'day');
            console.log(duration);
            setDurasi(duration);
        } else {
            setDurasi(0);
        }
    }, [tanggal_mulai, tanggal_selesai, setDurasi]);

    useEffect(() => {
        fetchMotor(token, setMotors, setError, setLoadData);
    }, []);

    useEffect(() => {
        fetchDiscounts(token, setDiskons, setError, setLoadData);
    }, []);

    useEffect(() => {
        fetchHistoryDetail(id, token, setHistory, setError, setMotorId, setSelectedMotor, setTanggalMulai, setTanggalSelesai, setHargaRental, setNomorHp, setNomorKontakDarurat);
    }, [id]);

    useEffect(() => {
        if (nomor_hp.startsWith('+62')) {
            setNomorHp(nomor_hp.slice(3));
        } else {
            setNomorHp(nomor_hp);
        }
    }, [nomor_hp]);
    useEffect(() => {
        if (nomor_kontak_darurat.startsWith('+62')) {
            setNomorKontakDarurat(nomor_kontak_darurat.slice(3));
        } else {
            setNomorKontakDarurat(nomor_kontak_darurat);
        }
    }, [nomor_kontak_darurat]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await EditHistory({
            id,
            token,
            nama_lengkap,
            email,
            no_telp,
            akun_sosmed,
            alamat,
            penyewa,
            motor_id: motor_id,
            tanggal_mulai,
            tanggal_selesai,
            keperluan_menyewa,
            penerimaan_motor,
            nama_kontak_darurat,
            nomor_kontak_darurat,
            hubungan_dengan_kontak_darurat,
            id_diskon,
            metode_pembayaran,
            total_pembayaran,
            status_history,
            selectedMotor,
            setHistory,
            setShowNotification,
            setError,
            setLoading,
        });
    };

    const handleBtnClick = (component) => {
        setActiveComponent(component);
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

    const handleSelectChangeStatus = (value) => {
        setStatusHistory(value);
    };

    return (
        <>
            <div>
                {activeComponent === "dashboard" && <Dashboard />}
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'dashboard' || activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'rating' ? null :
                <div className="block p-4 xl:ml-80">
                    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                        <div className="flex flex-col-reverse justify-between gap-1 md:flex-row md:items-center">
                            <div className="capitalize">
                                <nav aria-label="breadcrumb" className="w-max">
                                    <ol className="hidden md:flex flex-col md:flex-row items-start w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                        <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                                            <a href="#">
                                                <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                                            </a>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Daftar Motor</p>
                                            <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                        </li>
                                        <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                            <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Edit
                                            </p>
                                        </li>
                                    </ol>
                                </nav>
                                <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Edit</h6>
                            </div>
                            <div className="flex">
                                <div className="md:order-1 sm:order-2 order-2">
                                    <NavbarAdmin />
                                </div>
                                <div className="order-1">
                                    <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
                                </div>
                            </div>
                        </div>
                    </nav>
                    {loadData && (
                        <Loading />
                    )}
                    <div className="mt-12">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : history ? (
                            <EditHistoryForm
                                handleSubmit={handleSubmit}
                                history={history}
                                setNamaLengkap={setNamaLengkap}
                                setEmail={setEmail}
                                setNomorTelp={setNomorHp}
                                setAkunSosmed={setAkunSosmed}
                                setAlamat={setAlamat}
                                motors={motors}
                                handleSelectChangeNamaMotor={handleSelectChangeNamaMotor}
                                tanggal_mulai={tanggal_mulai}
                                handleDateStart={handleDateStart}
                                tanggal_selesai={tanggal_selesai}
                                handleDateEnd={handleDateEnd}
                                setKeperluan={setKeperluan}
                                setNamaKontakDarurat={setNamaKontakDarurat}
                                setNomorKontakDarurat={setNomorKontakDarurat}
                                setHubunganKontakDarurat={setHubunganKontakDarurat}
                                diskons={diskons}
                                handleSelectChangeDiskon={handleSelectChangeDiskon}
                                setTotalPembayaran={setTotalPembayaran}
                                handleSelectChangeStatus={handleSelectChangeStatus}
                                loading={loading}
                                selectedMotor={selectedMotor}
                                minEndDate={minEndDate}
                                total_pembayaran={total_pembayaran}
                                nomor_hp={nomor_hp}
                                nomor_kontak_darurat={nomor_kontak_darurat}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                        {showNotification && (
                            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
                                <span>Data berhasil dikirim</span>
                                <MdDone className="ml-2 text-white" />
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default Page;