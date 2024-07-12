'use client';

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import {
    Card,
    CardHeader,
    Button,
    Input,
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
    const [diskon, setDiskon] = useState(null);
    const [nama_diskon, setNamaDiskon] = useState('');
    const [potongan_harga, setPotonganHarga] = useState('');
    const [tanggal_mulai, setTanggalMulai] = useState('');
    const [tanggal_selesai, setTanggalSelesai] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const token = Cookies.get('token');

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/detail/${id}`, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append('gambar', file);
        if (nama_diskon) formData.append('nama_diskon', nama_diskon);
        if (potongan_harga) formData.append('potongan_harga', potongan_harga);
        if (tanggal_mulai) formData.append('tanggal_mulai', tanggal_mulai);
        if (tanggal_selesai) formData.append('tanggal_selesai', tanggal_selesai);

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diskon/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                setError(`Failed to update data: ${response.statusText}`);
            } else {
                const data = await response.json();
                console.log('Updated data:', data);
                setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.diskon.gambar}`);
                setShowNotification(true);

                setDiskon((prevDiskon) => ({
                    ...prevDiskon,
                    ...(nama_diskon && { nama_diskon: data.diskon.nama_diskon }),
                    ...(potongan_harga && { potongan_harga: data.diskon.potongan_harga }),
                    ...(tanggal_mulai && { tanggal_mulai: data.diskon.tanggal_mulai }),
                    ...(tanggal_selesai && { tanggal_selesai: data.diskon.tanggal_selesai }),
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
                                        <p className="block antialiased text-sm leading-normal font-normal text-[#1E3A8A]">Diskon</p>
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
                    ) : diskon ? (
                        <form action='post' method='post' onSubmit={handleSubmit}>
                            <Card className="w-full h-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="mb-4 flex flex-col justify-between gap-4">
                                        <span className="text-black font-medium">
                                            Edit Diskon Baru
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
                                                    Nama Diskon
                                                </span>
                                                <Input
                                                    label={`Masukkan nama diskon (${diskon.nama_diskon})`}
                                                    onChange={(e) => setNamaDiskon(e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Potongan Harga
                                                </span>
                                                <Input
                                                    type="number"
                                                    label={`Masukkan potongan harga (${diskon.potongan_harga})`}
                                                    onChange={(e) => setPotonganHarga(e.target.value)}
                                                />
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
                                                            label={`Pilih tanggal mulai (${diskon.tanggal_mulai})`}
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
                                                            label={`Pilih tanggal selesai (${diskon.tanggal_selesai})`}
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