'use client';

import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
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
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
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
                    console.log('Fetched data:', data); // Log the fetched data to check its structure
                    setUserData(data.user);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.gambar}`);
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
                        <NavbarAdmin />
                        <Sidebar activeComponent={activeComponent} handleButtonClick={handleButtonClick} />
                    </div>
                </nav>
                <div className="mt-12">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : userData ? (
                        <Card className="w-full h-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-4 flex flex-col justify-between gap-4">
                                    <span className="text-black font-medium">
                                        Detail Pengguna
                                    </span>
                                    <div className="border-t border-[#969696] w-full"></div>
                                    <span className="text-black">
                                        Foto
                                    </span>
                                    <div className="mr-4">
                                        <img
                                            src={image || 'https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg='}
                                            alt="Image Preview"
                                            className="max-w-40 h-auto rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Nama Pengguna
                                            </span>
                                            <Input label="Masukkan nama pengguna" value={userData.nama_pengguna} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Nama Lengkap
                                            </span>
                                            <Input label="Masukkan nama Lengkap" value={userData.nama_lengkap} disabled />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Email
                                            </span>
                                            <Input label="Masukkan email" type="email" value={userData.email} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Nomor HP
                                            </span>
                                            <Input label="Masukkan nomor HP" type="number" value={userData.nomor_hp} disabled />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Alamat
                                            </span>
                                            <Textarea label="Masukkan alamat lengkap" value={userData.alamat} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Peran
                                            </span>
                                            <Select label="Masukkan status motor" value={userData.peran} disabled>
                                                <Option className="text-white rounded-md w-full bg-blue-400" value='admin'>
                                                    Admin
                                                </Option>
                                                <Option className="text-white my-2 rounded-md w-full bg-green-400" value='user'>
                                                    User
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