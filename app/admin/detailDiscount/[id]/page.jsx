'use client';

import { useState, useEffect, useRef } from 'react';

import {
    Card,
    CardHeader,
    Input,
    Popover,
    PopoverHandler,
    PopoverContent,
    Spinner
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";

const Page = ({ params: { id } }) => {
    const [diskon, setDiskon] = useState(null);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState(null);
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [loadData, setLoadData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                    }
                });

                if (response.status === 204) {
                    setError('No content available for the provided ID');
                } else if (!response.ok) {
                    setError(`Failed to fetch data: ${response.statusText}`);
                } else {
                    const data = await response.json();
                    console.log('Fetched data:', data);
                    setDiskon(data.diskon);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.diskon.gambar}`);
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            } finally {
                setLoadData(false);
            }
        };
        fetchData();
    }, [id]);

    const handleDateStart = (date) => {
        if (date) {
            setTanggalMulai(format(date, 'yyyy-MM-dd'));
        } else {
            setTanggalMulai('');
        }
    };

    const handleDateEnd = (date) => {
        if (date) {
            setTanggalSelesai(format(date, 'yyyy-MM-dd'));
        } else {
            setTanggalSelesai('');
        }
    }

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
                                            <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                                        </a>
                                        <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                                    </li>
                                    <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                                        <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Diskon</p>
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
                {loadData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                        <Spinner color="blue" size="xl" />
                    </div>
                )}
                <div className="mt-12">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : diskon ? (
                        <Card className="w-full h-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-4 flex flex-col justify-between gap-4">
                                    <span className="text-black font-medium">
                                        Detail Diskon
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
                                                Nama Diskon
                                            </span>
                                            <Input label="Masukkan nama diskon" value={diskon.nama_diskon} disabled />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <span className="text-black">
                                                Potongan Harga
                                            </span>
                                            <Input label="Masukkan potongan harga" value={diskon.potongan_harga} disabled />
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
                                                        disabled
                                                        label="Select a Date"
                                                        onChange={() => null}
                                                        value={diskon.tanggal_mulai ? format(new Date(diskon.tanggal_mulai), "yyyy-MM-dd") : ""}
                                                    />
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    <DayPicker
                                                        mode="single"
                                                        selected={diskon.tanggal_mulai ? new Date(diskon.tanggal_mulai) : undefined}
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
                                                        disabled
                                                        label="Select a Date"
                                                        onChange={() => null}
                                                        value={diskon.tanggal_selesai ? format(new Date(diskon.tanggal_selesai), "yyyy-MM-dd") : ""}
                                                    />
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    <DayPicker
                                                        mode="single"
                                                        selected={diskon.tanggal_selesai ? new Date(diskon.tanggal_selesai) : undefined}
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