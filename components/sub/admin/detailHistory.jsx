'use client';

import React, { useState, useRef } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    Checkbox,
    Typography,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { Select, Option, Textarea } from "@material-tailwind/react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import NavbarAdmin from "@/components/sub/admin/navbar";

export default function DetailHistory() {
    const [date, setDate] = React.useState(Date);

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
                                    <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Riwayat</p>
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
                                Detail Riwayat
                            </span>
                            <div className="border-t border-[#969696] w-full"></div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nama Lengkap
                                    </span>
                                    <Input label="Masukkan nama pengguna" value="skipo" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Email
                                    </span>
                                    <Input label="skipo@gmail.com" type="email" value="skipo tzy" disabled />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nomor Telp
                                    </span>
                                    <Input label="Masukkan No Telp" type="number" value="081234567" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Akun Sosmed
                                    </span>
                                    <Input label="Masukkan akun sosmed" value="@zein_wx" disabled />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Alamat Lengkap
                                    </span>
                                    <Textarea label="Masukkan alamat lengkap" value="Desa. Besito, Kecamatan. Gebog, Kabupaten. Kudus, Provinsi. Jawa Tengah, Negara. Indonesia 59234" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Penyewa
                                    </span>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <div className="flex items-center cursor-not-allowed">
                                            <Checkbox defaultChecked disabled />
                                            Diri Sendiri
                                        </div>
                                        <div className="flex items-center cursor-not-allowed">
                                            <Checkbox disabled />
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
                                    <Input label="Masukkan nama motor" value="NMAX" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Tanggal Booking
                                    </span>
                                    <div className="w-full cursor-not-allowed">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    disabled
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-between text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(date.from, "LLL dd, y")} -{" "}
                                                                {format(date.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(date.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pilih</span>
                                                    )}
                                                    <CalendarIcon className="h-5 w-5" color="black" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={date?.from}
                                                    selected={date}
                                                    onSelect={setDate}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Keperluan Menyewa
                                    </span>
                                    <Textarea label="Masukkan keperluan menyewa" value="Saya ingin berlibur di daerah Kudus" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Penerimaan Motor
                                    </span>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <div className="flex items-center cursor-not-allowed">
                                            <Checkbox defaultChecked disabled />
                                            Diambil
                                        </div>
                                        <div className="flex items-center cursor-not-allowed">
                                            <Checkbox disabled />
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
                                    <Input label="Masukkan nama kontak darurat" value="Abdul" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Nomor Kontak Darurat
                                    </span>
                                    <Input label="Masukkan nomor kontak darurat" type="number" value="081234567" disabled />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Hubungan Dengan Kontak Darurat
                                    </span>
                                    <Input label="Masukkan Hubungan Dengan Kontak Darurat" value="Saudara" disabled />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Diskon
                                    </span>
                                    <Select label="Masukkan diskon" disabled>
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
                                            <Checkbox defaultChecked disabled />
                                            Tunai
                                        </div>
                                        <div className="flex items-center cursor-not-allowed">
                                            <Checkbox disabled />
                                            Cashless
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Total Pembayaran
                                    </span>
                                    <Input label="Masukkan total pembayaran" type="number" value="175000" disabled />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex flex-col gap-2">
                                    <span className="text-black">
                                        Status
                                    </span>
                                    <Select label="Masukkan status motor" disabled>
                                        <Option className="text-white rounded-md w-full bg-blue-400">
                                            Menunggu Pembayaran
                                        </Option>
                                        <Option className="text-white my-2 rounded-md w-full bg-yellow-400">
                                            Dipesan
                                        </Option>
                                        <Option className="text-white my-2 rounded-md w-full bg-orange-400">
                                            Sedang Digunakan
                                        </Option>
                                        <Option className="text-white my-2 rounded-md w-full bg-green-400">
                                            Selesai
                                        </Option>
                                        <Option className="text-white my-2 rounded-md w-full bg-red-400">
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
            </div>
        </div>
    );
}