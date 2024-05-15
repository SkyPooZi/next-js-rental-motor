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
import { Select, Option, Textarea } from "@material-tailwind/react";

import NavbarAdmin from "@/components/sub/admin/navbar";

export default function EditMotor() {
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
                                    <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Daftar Motor</p>
                                    <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                </li>
                                <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                    <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Edit
                                    </p>
                                </li>
                            </ol>
                        </nav>
                        <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-gray-900 mt-2">Tambah Motor Baru</h6>
                    </div>
                    <NavbarAdmin />
                </div>
            </nav>
            <div className="mt-12">
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-4">
                            <span className="text-black font-medium">
                                Edit Motor
                            </span>
                            <div className="border-t border-[#969696] w-full"></div>
                            <span className="text-black">
                                Foto
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
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nama Motor
                                    </span>
                                    <Input label="Masukkan nama motor" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Tipe
                                    </span>
                                    <Input label="Masukkan tipe motor" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Merk
                                    </span>
                                    <Input label="Masukkan merk motor" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Stok
                                    </span>
                                    <Input label="Masukkan stok motor" type="number" />
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
                                    <Input label="Masukkan harga motor" type="number" />
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
                                    <Input label="Masukkan harga motor" type="number" />
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
                                        Fasilitas
                                    </span>
                                    <Textarea label="Masukkan fasilitas tambahan" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Status
                                    </span>
                                    <Select label="Masukkan status motor">
                                        <Option className="text-white rounded-md w-full bg-green-400">
                                            Tersedia
                                        </Option>
                                        <Option className="text-white my-2 rounded-md w-full bg-orange-400">
                                            Tertunda
                                        </Option>
                                        <Option className="text-white rounded-md w-full bg-red-400">
                                            Tidak Tersedia
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="cursor-pointer text-xs rounded-lg px-3 py-2 capitalize text-white bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                                >
                                    Edit Motor
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}