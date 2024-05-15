'use client';

import React, { useState, useRef } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
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
} from "@material-tailwind/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

import { Select, Option, Textarea } from "@material-tailwind/react";

import NavbarAdmin from "@/components/sub/admin/navbar";

export default function Profile() {
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = file ? URL.createObjectURL(file) : '';
        setImagePreview(imageUrl);
    };

    const [value, setValue] = useState('');

    return (
        <div className="p-4 xl:ml-80">
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
                                    <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Profil</p>
                                </li>
                            </ol>
                        </nav>
                        <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Profil</h6>
                    </div>
                    <NavbarAdmin />
                </div>
            </nav>
            <div className="mt-12">
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-4">
                            <span className="text-black font-medium">
                                Informasi Pengguna
                            </span>
                            <div className="border-t border-[#969696] w-full"></div>
                            <span className="text-black">
                                Foto <span className="text-[#FF4D33] font-semibold">*</span>
                            </span>
                            <div className="mr-4">
                                <img
                                    src={imagePreview || 'https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg='}
                                    alt="Image Preview"
                                    className="max-w-32 h-auto rounded-md"
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
                                    onClick={handleButtonClick}
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Pilih Foto
                                </button>
                            </div>
                            <span className="text-[#6B7280] text-xs">
                                Gambar profile memiliki rasio 1:1
                                dan tidak lebih dari 2MB.
                            </span>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nama Lengkap <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Input label="Masukkan nama lengkap" value="skipo tzy" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nama Pengguna <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Input label="Masukkan nama pengguna" value="skipo" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Alamat <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Textarea label="Masukkan alamat lengkap" value="Kudus, " />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nomor HP <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Input label="Masukkan nomor HP" value="081234567" type="number" />
                                </div>
                            </div>
                            <div>
                                <button
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 capitalize text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="w-full h-full mt-10">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-4">
                            <span className="text-black font-medium">
                                Ubah Email
                            </span>
                            <div className="border-t border-[#969696] w-full"></div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Email <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Input label="Masukkan email" value="skipo@gmail.com" />
                                    <span className="text-[#6B7280] text-xs">
                                        Email akan berubah ketika Anda sudah memasukkan kode OTP untuk verifikasi yang dikirimkan ke email baru Anda.
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 capitalize text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Ubah Email
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="w-full h-full mt-10">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-4">
                            <span className="text-black font-medium">
                                Ubah Password
                            </span>
                            <div className="border-t border-[#969696] w-full"></div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Masukkan Password Lama <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Input label="Masukkan password lama" type="password" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Password Baru <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Input label="Masukkan password baru" type="password" />
                                    <span className="text-[#6B7280] text-xs">
                                        Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Konfirmasi Password Baru <span className="text-[#FF4D33] font-semibold">*</span>
                                    </span>
                                    <Input label="Konfirmasi password baru" type="password" />
                                </div>
                            </div>
                            <div>
                                <button
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 capitalize text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Simpan Password
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}