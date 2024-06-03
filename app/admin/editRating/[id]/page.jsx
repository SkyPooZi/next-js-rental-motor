'use client';

import React from 'react';
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
    Textarea,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { MdDone } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";

const Page = ({ params: { id } }) => {
    const [review, setReview] = useState(null);
    const [nama_pengguna, setNamaPengguna] = useState('');
    const [penilaian, setPenilaian] = useState(0);
    const [komentar, setKomentar] = useState('');
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState("detailUser");
    const [image, setImage] = useState('https://media.istockphoto.com/id/1441026821/vector/no-picture-available-placeholder-thumbnail-icon-illustration.jpg?s=612x612&w=0&k=20&c=7K9T9bguFyJyKOTvPkdoTWZYRWA3zGvx_xQI53BT0wg=');
    const [imagePreview, setImagePreview] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [hover, setHover] = useState(null);
    const totalStars = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/detail/${id}`, {
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
                    setReview(data.review);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.review.gambar}`);
                    setPenilaian(data.review.penilaian);
                }
            } catch (err) {
                setError(`An error occurred: ${err.message}`);
            }
        };
        fetchData();
    }, [id]);

    const handleRatingChange = (newRating) => {
        setPenilaian(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append('gambar', file);
        if (nama_pengguna) formData.append('nama_pengguna', nama_pengguna);
        if (penilaian) formData.append('penilaian', penilaian);
        if (komentar) formData.append('komentar', komentar);

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/edit/${id}`, {
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
                setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.review.gambar}`);
                setShowNotification(true);

                setReview((prevReview) => ({
                    ...prevReview,
                    // Update only the fields that have been modified
                    ...(nama_pengguna && { nama_pengguna: data.review.nama_pengguna }),
                    ...(penilaian && { penilaian: data.review.penilaian }),
                    ...(komentar && { komentar: data.review.komentar }),
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

    const renderStar = (starValue) => {
        const isFilled = starValue <= (hover || penilaian);

        return (
            <span
                key={starValue}
                className="cursor-pointer text-2xl"
                style={{ color: isFilled ? "#ffc107" : "#e4e5e9" }}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleRatingChange(starValue)}
            >
                {isFilled ? "★" : "☆"}
            </span>
        );
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
                    ) : review ? (
                        <form action='post' method='post' onSubmit={handleSubmit}>
                            <Card className="w-full h-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="mb-4 flex flex-col justify-between gap-4">
                                        <span className="text-black font-medium">
                                            Edit Ulasan
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
                                        <div className="flex flex-col md:flex-row gap-5">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Nama Pengguna
                                                </span>
                                                <Input
                                                    label={`Nama Pengguna (${review.user.nama_pengguna})`}
                                                    onChange={(e) => setNamaPengguna(e.target.value)}
                                                    disabled
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Penilaian
                                                </span>
                                                <div className="flex gap-3 cursor-pointer">
                                                    {[...Array(totalStars)].map((_, index) => {
                                                        const starValue = index + 1;
                                                        return renderStar(starValue);
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="text-black">
                                                    Komentar
                                                </span>
                                                <Textarea
                                                    label={`Komentar (${review.komentar})`}
                                                    onChange={(e) => setKomentar(e.target.value)}
                                                />
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
                            <span>Data berhasil diupdate</span>
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