'use client';

import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    Checkbox,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
    Select,
    Option,
    Textarea
} from "@material-tailwind/react";

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";

const Page = ({ params: { id } }) => {
    const [history, setHistory] = useState(null);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 2|MjQOQVQDqcxEp15R7O2WjxlI7QGdF7tTxraDuFl2759fc079`
                    }
                });

                if (response.status === 204) {
                    setError('No content available for the provided ID');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setHistory(data.history);
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };
        fetchData();
    }, [id]);

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <div className='hidden xl:block'>
                <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
            </div>
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
                                        <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Detail
                                        </p>
                                    </li>
                                </ol>
                            </nav>
                            <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Detail</h6>
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
                <div className="mt-12">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : history ? (
                        <Card className="w-full h-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-4 flex flex-col justify-between gap-4">
                                    <span className="text-black font-medium">
                                        Detail Riwayat
                                    </span>
                                    <div className="border-t border-[#969696] w-full"></div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Nama Lengkap
                                            </span>
                                            <Input label="Masukkan nama pengguna" value={history.nama_lengkap} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Email
                                            </span>
                                            <Input label="skipo@gmail.com" type="email" value={history.email} disabled />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Nomor Telp
                                            </span>
                                            <Input label="Masukkan No Telp" value={history.no_telp} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Akun Sosmed
                                            </span>
                                            <Input label="Masukkan akun sosmed" value={history.akun_sosmed} disabled />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Alamat Lengkap
                                            </span>
                                            <Textarea label="Masukkan alamat lengkap" value={history.alamat} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Penyewa
                                            </span>
                                            <div className="flex flex-col md:flex-row gap-5">
                                                <div className="flex items-center cursor-not-allowed">
                                                    <Checkbox
                                                        disabled
                                                        value="Diri Sendiri"
                                                        checked={history.penyewa === "Diri Sendiri"}
                                                    />
                                                    Diri Sendiri
                                                </div>
                                                <div className="flex items-center cursor-not-allowed">
                                                    <Checkbox
                                                        disabled
                                                        value="Orang Lain"
                                                        checked={history.penyewa === "Orang Lain"}
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
                                            <Input label="Masukkan nama motor" value={history.list_motor.nama_motor} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Tanggal Booking
                                            </span>
                                            <div className="w-full cursor-not-allowed">
                                                <Input label="Masukkan tanggal booking" value={history.tanggal_booking} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Keperluan Menyewa
                                            </span>
                                            <Textarea label="Masukkan keperluan menyewa" value={history.keperluan_menyewa} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Penerimaan Motor
                                            </span>
                                            <div className="flex flex-col md:flex-row gap-5">
                                                <div className="flex items-center cursor-not-allowed">
                                                    <Checkbox
                                                        disabled
                                                        value="Diambil"
                                                        checked={history.penerimaan_motor === "Diambil"}
                                                    />
                                                    Diambil
                                                </div>
                                                <div className="flex items-center cursor-not-allowed">
                                                    <Checkbox
                                                        disabled
                                                        value="Diantar"
                                                        checked={history.penerimaan_motor === "Diantar"}
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
                                            <Input label="Masukkan nama kontak darurat" value={history.nama_kontak_darurat} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Nomor Kontak Darurat
                                            </span>
                                            <Input label="Masukkan nomor kontak darurat" value={history.nomor_kontak_darurat} disabled />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Hubungan Dengan Kontak Darurat
                                            </span>
                                            <Input label="Masukkan Hubungan Dengan Kontak Darurat" value={history.hubungan_dengan_kontak_darurat} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Diskon
                                            </span>
                                            <Select label="Masukkan diskon" value={history.diskon.nama_diskon} disabled>
                                                <Option className="text-white rounded-md w-full bg-green-400">
                                                    Ramadhan
                                                </Option>
                                                <Option className="text-white my-2 rounded-md w-full bg-red-400">
                                                    Natal
                                                </Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Metode Pembayaran
                                            </span>
                                            <div className="flex flex-col md:flex-row gap-5">
                                                <div className="flex items-center cursor-not-allowed">
                                                    <Checkbox
                                                        disabled
                                                        value="Tunai"
                                                        checked={history.metode_pembayaran === "Tunai"}
                                                    />
                                                    Tunai
                                                </div>
                                                <div className="flex items-center cursor-not-allowed">
                                                    <Checkbox
                                                        disabled
                                                        value="Cashless"
                                                        checked={history.metode_pembayaran === "Cashless"}
                                                    />
                                                    Cashless
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Total Pembayaran
                                            </span>
                                            <Input label="Masukkan total pembayaran" type="number" value={history.total_pembayaran} disabled />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Status
                                            </span>
                                            <Select label="Masukkan status motor" value={history.status_history} disabled>
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
                                        <a href="/admin">
                                            <button
                                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                            >
                                                Kembali
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            }
        </>
    );
}

export default Page;