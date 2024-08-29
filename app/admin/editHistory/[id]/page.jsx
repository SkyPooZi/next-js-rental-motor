'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import {
    Card,
    CardHeader,
    Button,
    Checkbox,
    Input,
    Select,
    Option,
    Textarea,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { format, set } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
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

const Page = ({ params: { id } }) => {
    const [motors, setMotors] = useState([]);
    const [diskons, setDiskons] = useState([]);
    const [history, setHistory] = useState(null);
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [no_telp, setNomorTelp] = useState('');
    const [akun_sosmed, setAkunSosmed] = useState('');
    const [alamat, setAlamat] = useState('');
    const [penyewa, setPenyewa] = useState('');
    const [motor_id, setMotorId] = useState('');
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [keperluan_menyewa, setKeperluan] = useState('');
    const [penerimaan_motor, setPenerimaan] = useState('');
    const [nama_kontak_darurat, setNamaKontakDarurat] = useState('');
    const [nomor_kontak_darurat, setNomorKontakDarurat] = useState('');
    const [hubungan_dengan_kontak_darurat, setHubunganKontakDarurat] = useState('');
    const [id_diskon, setDiskon] = useState('');
    const [metode_pembayaran, setMetodePembayaran] = useState('');
    const [total_pembayaran, setTotalPembayaran] = useState('');
    const [status_history, setStatusHistory] = useState('');
    const [selectedMotor, setSelectedMotor] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const token = Cookies.get('token');

    const handleSelectChangeDiskon = (value) => {
        setDiskon(value);
    }

    const handleSelectChangeNamaMotor = (value) => {
        setSelectedMotor(value);
    }

    useEffect(() => {
        fetchMotor(token, setMotors, setError, setLoadData);
    }, []);

    useEffect(() => {
        fetchDiscounts(token, setDiskons, setError, setLoadData);
    }, []);

    useEffect(() => {
        fetchHistoryDetail(id, token, setHistory, setError, setSelectedMotor);
    }, [id]);

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
            motor_id,
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
            setNomorTelp(format(date, 'yyyy-MM-dd'));
        } else {
            setNomorTelp('');
        }
    };

    const handleDateEnd = (date) => {
        if (date) {
            setAkunSosmed(format(date, 'yyyy-MM-dd'));
        } else {
            setAkunSosmed('');
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
                                setNomorTelp={setNomorTelp}
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