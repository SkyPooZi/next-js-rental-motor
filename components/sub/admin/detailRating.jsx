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

export default function DetailRating() {
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
                                    <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Ulasan</p>
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
                </div>
            </nav>
            <div className="mt-12">
                <Card className="w-full h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-4">
                            <span className="text-black font-medium">
                                Detail Ulasan
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
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nama Pengguna
                                    </span>
                                    <Input label="Masukkan nama pengguna" value="skipo" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Penilaian
                                    </span>
                                    <div className="flex gap-3">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                                <path d="M12 .587l3.668 7.425 8.332 1.212-6.042 5.888 1.426 8.31L12 18.897l-7.384 3.925 1.426-8.31L.412 9.224l8.332-1.212L12 .587z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Komentar
                                    </span>
                                    <Textarea label="Masukkan komentar" value="Motor Vario 150 sangat keren" disabled />
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
            </div>
        </div>
    );
}