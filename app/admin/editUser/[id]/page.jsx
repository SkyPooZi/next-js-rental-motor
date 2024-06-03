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
    const [user, setUser] = useState(null);
    const [nama_pengguna, setNamaPengguna] = useState('');
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [nomor_hp, setNomorHp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [peran, setPeran] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSelectChangeRole = (value) => {
        setPeran(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    },
                });

                if (response.status === 204) {
                    setError('No content available for the provided ID');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setUser(data.user);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.user.gambar}`);
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
        if (file) formData.append('gambar', file);
        if (nama_pengguna) formData.append('nama_pengguna', nama_pengguna);
        if (nama_lengkap) formData.append('nama_lengkap', nama_lengkap);
        if (email) formData.append('email', email);
        if (nomor_hp) formData.append('nomor_hp', nomor_hp);
        if (alamat) formData.append('alamat', alamat);
        if (peran) formData.append('peran', peran);

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${id}`, {
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
                setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.user.gambar}`);
                setShowNotification(true);

                setUser((prevUser) => ({
                    ...prevUser,
                    // Update only the fields that have been modified
                    ...(nama_pengguna && { nama_pengguna: data.user.nama_pengguna }),
                    ...(nama_lengkap && { nama_lengkap: data.user.nama_lengkap }),
                    ...(email && { email: data.user.email }),
                    ...(nomor_hp && { nomor_hp: data.user.nomor_hp }),
                    ...(alamat && { alamat: data.user.alamat }),
                    ...(peran && { peran: data.user.peran }),
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
                                            <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">beranda</p>
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
                <div className="mt-12">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : user ? (
                        <form action='post' method='post' onSubmit={handleSubmit}>
                            <Card className="w-full h-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="mb-4 flex flex-col justify-between gap-4">
                                        <span className="text-black font-medium">
                                            Edit Pengguna
                                        </span>
                                        <div className="border-t border-[#969696] w-full"></div>
                                        <span className="text-black">
                                            Foto
                                        </span>
                                        <div className="mr-4">
                                            <img
                                                src={imagePreview || image}
                                                alt="Image Preview"
                                                className="max-w-40 h-auto rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="file"
                                                id="picture"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                ref={fileInputRef}
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleButtonClick}
                                                className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                            >
                                                Pilih Foto
                                            </button>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nama Pengguna
                                                </span>
                                                <Input
                                                    label={`Masukkan nama pengguna (${user.nama_pengguna})`}
                                                    onChange={(e) => setNamaPengguna(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nama Lengkap
                                                </span>
                                                <Input
                                                    label={`Masukkan nama lengkap (${user.nama_lengkap})`}
                                                    onChange={(e) => setNamaLengkap(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Email
                                                </span>
                                                <Input
                                                    label={`Masukkan email (${user.email})`}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type='email'
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nomor HP
                                                </span>
                                                <Input
                                                    label={`Masukkan no hp (${user.nomor_hp})`}
                                                    onChange={(e) => setNomorHp(e.target.value)}
                                                />                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Alamat
                                                </span>
                                                <Textarea
                                                    label={`Masukkan alamat (${user.alamat})`}
                                                    onChange={(e) => setAlamat(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Peran
                                                </span>
                                                <Select
                                                    label={`Masukkan peran (${user.peran})`}
                                                    onChange={handleSelectChangeRole}
                                                >
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