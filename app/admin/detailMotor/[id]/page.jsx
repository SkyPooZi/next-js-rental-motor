'use client';

import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import Image from "next/image";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
    Select,
    Option,
    Textarea,
    Spinner
} from "@material-tailwind/react";

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from "@/components/main/sidebar";

const Page = ({ params: { id } }) => {
    const [motor, setMotor] = useState(null);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [loadData, setLoadData] = useState(true);
    const [image, setImage] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 204) {
                    setError('No content available for the provided ID');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setMotor(data.listMotor);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.listMotor.gambar_motor}`);
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setLoadData(false);
            }
        };
        fetchData();
    }, [id]);

    const handleBtnClick = (component) => {
        setActiveComponent(component);
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
            ) :
                <div div className="block p-4 xl:ml-80">
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
                            <div className='hidden xl:block'>
                                <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="md:order-1 sm:order-2 order-2">
                                <NavbarAdmin />
                            </div>
                            <div className="order-1">
                                <Sidebar activeComponent={activeComponent} handleButtonClick={handleBtnClick} />
                            </div>
                        </div>
                    </nav>
                    <div className="mt-12">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : motor ? (
                            <Card className="w-full h-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="mb-4 flex flex-col justify-between gap-4">
                                        <span className="text-black font-medium">
                                            Detail Motor
                                        </span>
                                        <div className="border-t border-[#969696] w-full"></div>
                                        <span className="text-black">
                                            Foto
                                        </span>
                                        <div className="mr-4">
                                            <img
                                                src={image}
                                                alt="Image Preview"
                                                className="max-w-40 h-auto rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nama Motor
                                                </span>
                                                <Input label="Masukkan nama motor" value={motor.nama_motor} disabled />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Tipe
                                                </span>
                                                <Select label="Masukkan tipe motor" value={motor.tipe_motor} disabled>
                                                    <Option className="rounded-md w-full" value='Matic'>
                                                        Matic
                                                    </Option>
                                                    <Option className="my-2 rounded-md w-full" value='Manual'>
                                                        Manual
                                                    </Option>
                                                    <Option className='my-2 rounded-md w-full' value='Premium Matic'>
                                                        Premium Matic
                                                    </Option>
                                                    <Option className='my-2 rounded-md w-full' value='Sport'>
                                                        Sport
                                                    </Option>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Merk
                                                </span>
                                                <Input label="Masukkan merk motor" value={motor.merk_motor} disabled />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Stok
                                                </span>
                                                <Input label="Masukkan stok motor" type="number" value={motor.stok_motor} disabled />
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="flex items-center gap-1 font-normal"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="-mt-px h-4 w-4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Gunakan angka untuk memasang stok
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Harga Motor Per 1 Hari
                                                </span>
                                                <Input label="Masukkan harga motor" type="number" value={motor.harga_motor_per_1_hari} disabled />
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="flex items-center gap-1 font-normal"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="-mt-px h-4 w-4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Gunakan angka untuk memasang harga
                                                </Typography>
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Harga Motor Per 1 Minggu
                                                </span>
                                                <Input label="Masukkan harga motor" type="number" value={motor.harga_motor_per_1_minggu} disabled />
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="flex items-center gap-1 font-normal"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="-mt-px h-4 w-4"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Gunakan angka untuk memasang harga
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Fasilitas <span className="text-[#FF4D33] font-semibold">*</span>
                                                </span>
                                                <Textarea label="Masukkan fasilitas tambahan" value={motor.fasilitas_motor} disabled />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Status <span className="text-[#FF4D33] font-semibold">*</span>
                                                </span>
                                                <Select label="Masukkan status motor" value={motor.status_motor} disabled>
                                                    <Option className="text-white rounded-md w-full bg-green-400" value='Tersedia'>
                                                        Tersedia
                                                    </Option>
                                                    <Option className="text-white my-2 rounded-md w-full bg-orange-400" value='Tertunda'>
                                                        Tertunda
                                                    </Option>
                                                    <Option className="text-white rounded-md w-full bg-red-400" value='Tidak Tersedia'>
                                                        Tidak Tersedia
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
                </div >
            }
        </>
    );
}

export default Page;