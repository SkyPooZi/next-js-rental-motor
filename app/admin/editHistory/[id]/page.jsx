'use client';

import { useState, useEffect } from 'react';

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
    Spinner
} from "@material-tailwind/react";
import { format } from "date-fns";
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

const Page = ({ params: { id } }) => {
    const [motors, setMotors] = useState([]);
    const [diskons, setDiskons] = useState([]);
    const [history, setHitory] = useState(null);
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [no_telp, setNomorTelp] = useState('');
    const [akun_sosmed, setAkunSosmed] = useState('');
    const [alamat, setAlamat] = useState('');
    const [penyewa, setPenyewa] = useState('');
    const [nama_motor, setNamaMotor] = useState('');
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
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loadData, setLoadData] = useState(true);

    const handleSelectChangeDiskon = (value) => {
        setDiskon(value);
    }

    const handleSelectChangeNamaMotor = (value) => {
        setNamaMotor(value);
    }

    useEffect(() => {
        const fetchMotor = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 2|E10dpmchQiCqgGxITQaPCNDQVYLEQrm0LrgpNlwA7eba5706`
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
            } finally {
                setLoadData(false);
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
                        'Authorization': `Bearer 2|E10dpmchQiCqgGxITQaPCNDQVYLEQrm0LrgpNlwA7eba5706`
                    }
                });
                if (response.status === 204) {
                    setError('No content available');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched motor:', data);
                    setDiskons(data.diskon || []);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoadData(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 2|E10dpmchQiCqgGxITQaPCNDQVYLEQrm0LrgpNlwA7eba5706`
                    }
                });

                if (response.status === 204) {
                    setError('No content available for the provided ID');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setHitory(data.history);
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (nama_lengkap) formData.append('nama_lengkap', nama_lengkap);
        if (email) formData.append('email', email);
        if (no_telp) formData.append('no_telp', no_telp);
        if (akun_sosmed) formData.append('akun_sosmed', akun_sosmed);
        if (alamat) formData.append('alamat', alamat);
        if (penyewa) formData.append('penyewa', penyewa);
        if (nama_motor) formData.append('nama_motor', nama_motor);
        if (tanggal_mulai) formData.append('tanggal_mulai', tanggal_mulai);
        if (tanggal_selesai) formData.append('tanggal_selesai', tanggal_selesai);
        if (keperluan_menyewa) formData.append('keperluan_menyewa', keperluan_menyewa);
        if (penerimaan_motor) formData.append('penerimaan_motor', penerimaan_motor);
        if (nama_kontak_darurat) formData.append('nama_kontak_darurat', nama_kontak_darurat);
        if (nomor_kontak_darurat) formData.append('nomor_kontak_darurat', nomor_kontak_darurat);
        if (hubungan_dengan_kontak_darurat) formData.append('hubungan_kontak_darurat', hubungan_dengan_kontak_darurat);
        if (id_diskon) formData.append('diskon.id', id);
        if (metode_pembayaran) formData.append('metode_pembayaran', metode_pembayaran);
        if (total_pembayaran) formData.append('total_pembayaran', total_pembayaran);
        if (status_history) formData.append('status_history', status_history);

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                },
                body: formData
            });

            if (!response.ok) {
                setError(`Failed to update data: ${response.statusText}`);
            } else {
                const data = await response.json();
                console.log('Updated data:', data);
                setShowNotification(true);

                setHitory((prevHistory) => ({
                    ...prevHistory,
                    ...(nama_lengkap && { nama_lengkap: data.history.nama_lengkap }),
                    ...(email && { email: data.history.email }),
                    ...(no_telp && { no_telp: data.history.no_telp }),
                    ...(akun_sosmed && { akun_sosmed: data.history.akun_sosmed }),
                    ...(alamat && { alamat: data.history.alamat }),
                    ...(penyewa && { penyewa: data.history.penyewa }),
                    ...(nama_motor && { nama_motor: data.history.nama_motor }),
                    ...(tanggal_mulai && { tanggal_mulai: data.history.tanggal_mulai }),
                    ...(tanggal_selesai && { tanggal_selesai: data.history.tanggal_selesai }),
                    ...(keperluan_menyewa && { keperluan_menyewa: data.history.keperluan_menyewa }),
                    ...(penerimaan_motor && { penerimaan_motor: data.history.penerimaan_motor }),
                    ...(nama_kontak_darurat && { nama_kontak_darurat: data.history.nama_kontak_darurat }),
                    ...(nomor_kontak_darurat && { nomor_kontak_darurat: data.history.nomor_kontak_darurat }),
                    ...(hubungan_dengan_kontak_darurat && { hubungan_dengan_kontak_darurat: data.history.hubungan_dengan_kontak_darurat }),
                    ...(id_diskon && { id_diskon: data.history.id_diskon }),
                    ...(metode_pembayaran && { metode_pembayaran: data.history.metode_pembayaran }),
                    ...(total_pembayaran && { total_pembayaran: data.history.total_pembayaran }),
                    ...(status_history && { status_history: data.history.status_history }),
                }));

                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            }
        } catch (err) {
            setError(`An error occurred: ${err.message}`);
        } finally {
            setLoading(false);
        }
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
            {activeComponent === 'dashboard' ? (
                null
            ) : activeComponent === 'list' ? (
                null
            ) : activeComponent === 'user' ? (
                null
            ) : activeComponent === 'discount' ? (
                null
            ) : activeComponent === 'history' ? (
                null
            ) : activeComponent === 'rating' ? (
                null
            ) : <div className="block p-4 xl:ml-80">
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                        <Spinner color="blue" size="xl" />
                    </div>
                )}
                <div className="mt-12">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : history ? (
                        <form action='post' method='post' onSubmit={handleSubmit}>
                            <Card className="w-full h-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="mb-4 flex flex-col justify-between gap-4">
                                        <span className="text-black font-medium">
                                            Edit Riwayat
                                        </span>
                                        <div className="border-t border-[#969696] w-full"></div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nama Lengkap
                                                </span>
                                                <Input
                                                    label={`Masukkan nama lengkap (${history.nama_lengkap})`}
                                                    onChange={(e) => setNamaLengkap(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Email
                                                </span>
                                                <Input
                                                    label={`Masukkan email (${history.email})`}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type='email'
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nomor Telp
                                                </span>
                                                <Input
                                                    label={`Masukkan nomor telp (${history.no_telp})`}
                                                    onChange={(e) => setNomorTelp(e.target.value)}
                                                    type='number'
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Akun Sosmed
                                                </span>
                                                <Input
                                                    label={`Masukkan akun sosmed (${history.akun_sosmed})`}
                                                    onChange={(e) => setAkunSosmed(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Alamat Lengkap
                                                </span>
                                                <Textarea
                                                    label={`Masukkan alamat lengkap (${history.alamat})`}
                                                    onChange={(e) => setAlamat(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Penyewa
                                                </span>
                                                <div className="flex flex-col md:flex-row gap-5">
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            value="Diri Sendiri"
                                                            checked={history.penyewa === "Diri Sendiri"}
                                                            disabled
                                                        />
                                                        Diri Sendiri
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            value="Orang Lain"
                                                            checked={history.penyewa === "Orang Lain"}
                                                            disabled
                                                        />
                                                        Orang Lain
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nama Motor
                                                </span>
                                                {motors.length > 0 && (
                                                    <div className="w-full">
                                                        <Select
                                                            label={`Pilih nama motor (${history.list_motor.nama_motor})`}
                                                            onChange={handleSelectChangeNamaMotor}
                                                            disabled
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
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Tanggal Mulai
                                                </span>
                                                <Popover placement="bottom">
                                                    <PopoverHandler>
                                                        <Input
                                                            label={`Pilih tanggal mulai (${history.tanggal_mulai})`}
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
                                                    Tanggal Selesai
                                                </span>
                                                <Popover placement="bottom">
                                                    <PopoverHandler>
                                                        <Input
                                                            label={`Pilih tanggal selesai (${history.tanggal_selesai})`}
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
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Keperluan Menyewa
                                                </span>
                                                <Textarea
                                                    label={`Masukkan keperluan menyewa (${history.keperluan_menyewa})`}
                                                    onChange={(e) => setKeperluan(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Penerimaan Motor
                                                </span>
                                                <div className="flex flex-col md:flex-row gap-5">
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            value="Diambil"
                                                            checked={history.penerimaan_motor === "Diambil"}
                                                            disabled
                                                        />
                                                        Diambil
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            value="Diantar"
                                                            checked={history.penerimaan_motor === "Diantar"}
                                                            disabled
                                                        />
                                                        Diantar
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nama Kontak Darurat
                                                </span>
                                                <Input
                                                    label={`Masukkan nama kontak darurat (${history.nama_kontak_darurat})`}
                                                    onChange={(e) => setNamaKontakDarurat(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nomor Kontak Darurat
                                                </span>
                                                <Input
                                                    label={`Masukkan nomor kontak darurat (${history.nomor_kontak_darurat})`}
                                                    onChange={(e) => setNomorKontakDarurat(e.target.value)}
                                                    type='number'
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Hubungan Dengan Kontak Darurat
                                                </span>
                                                <Input
                                                    label={`Masukkan hubungan dengan kontak darurat (${history.hubungan_dengan_kontak_darurat})`}
                                                    onChange={(e) => setHubunganKontakDarurat(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Diskon
                                                </span>
                                                {diskons.length > 0 && (
                                                    <div className="w-full">
                                                        <Select
                                                            label={`Pilih diskon (${history.diskon.nama_diskon})`}
                                                            onChange={handleSelectChangeDiskon}
                                                            disabled
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
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Metode Pembayaran
                                                </span>
                                                <div className="flex flex-col md:flex-row gap-5">
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            value="Tunai"
                                                            checked={history.metode_pembayaran === "Tunai"}
                                                            disabled
                                                        />
                                                        Tunai
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            value="Cashless"
                                                            checked={history.metode_pembayaran === "Cashless"}
                                                            disabled
                                                        />
                                                        Cashless
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Total Pembayaran
                                                </span>
                                                <Input
                                                    label={`Masukkan total pembayaran (${history.total_pembayaran})`}
                                                    onChange={(e) => setTotalPembayaran(e.target.value)}
                                                    type='number'
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Status
                                                </span>
                                                <Select
                                                    label={`Masukkan status (${history.status_history})`}
                                                    onChange={handleSelectChangeStatus}
                                                >
                                                    <Option className="text-white rounded-md w-full bg-blue-400" value='Menunggu Pembayaran'>
                                                        Menunggu Pembayaran
                                                    </Option>
                                                    <Option className="text-white my-2 rounded-md w-full bg-yellow-400" value='Dipesan'>
                                                        Dipesan
                                                    </Option>
                                                    <Option className="text-white my-2 rounded-md w-full bg-orange-400" value='Sedang Digunakan'>
                                                        Sedang Digunakan
                                                    </Option>
                                                    <Option className="text-white my-2 rounded-md w-full bg-green-400" value='Selesai'>
                                                        Selesai
                                                    </Option>
                                                    <Option className="text-white my-2 rounded-md w-full bg-red-400" value='Dibatalkan'>
                                                        Dibatalkan
                                                    </Option>
                                                </Select>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                type="submit"
                                                className={`cursor-pointer capitalize text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                loading={loading}
                                            >
                                                {loading ? 'Loading...' : 'Ubah Data'}
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </form>
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