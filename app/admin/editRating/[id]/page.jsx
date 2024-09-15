'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { MdDone } from "react-icons/md";

import Dashboard from "@/components/sub/admin/dashboard";
import MotorList from "@/components/sub/admin/motorList";
import User from "@/components/sub/admin/user";
import History from "@/components/sub/admin/history";
import Rating from "@/components/sub/admin/rating";
import Discount from "@/components/sub/admin/discount";
import Sidebar from '@/components/main/sidebar';
import NavbarAdmin from "@/components/sub/admin/navbar";
import MoneyManagement from '@/components/sub/admin/laporanKeuangan';
import Loading from '@/components/ui/loading';
import EditReviewForm from '@/components/sub/editReviewForm';
import { fetchReviewData } from '@/utils/services/fetchDetailReview';
import { updateReview } from '@/utils/services/updateReview';

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
    const [loadData, setLoadData] = useState(true);
    const totalStars = 5;
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewData = await fetchReviewData({ id, token });
                console.log('Fetched data:', reviewData);
                setReview(reviewData);
                setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${reviewData.gambar}`);
                setPenilaian(reviewData.penilaian);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadData(false);
            }
        };
        fetchData();
    }, [id, token]);

    const handleRatingChange = (newRating) => {
        setPenilaian(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updatedReview = await updateReview({ id, token, file, nama_pengguna, penilaian, komentar });
            console.log('Updated data:', updatedReview);
            setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${updatedReview.gambar}`);
            setShowNotification(true);

            setReview((prevReview) => ({
                ...prevReview,
                ...(nama_pengguna && { nama_pengguna: updatedReview.nama_pengguna }),
                ...(penilaian && { penilaian: updatedReview.penilaian }),
                ...(komentar && { komentar: updatedReview.komentar }),
            }));

            setTimeout(() => {
                setShowNotification(false);
                window.location.reload();
            }, 1000);
        } catch (err) {
            setError(err.message);
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
            <div>
                {activeComponent === "dashboard" && <Dashboard />}
                {activeComponent === "list" && <MotorList />}
                {activeComponent === "user" && <User />}
                {activeComponent === "discount" && <Discount />}
                {activeComponent === "history" && <History />}
                {activeComponent === "moneyManagement" && <MoneyManagement />}
                {activeComponent === "rating" && <Rating />}
            </div>
            {activeComponent === 'dashboard' || activeComponent === 'list' || activeComponent === 'user' || activeComponent === 'discount' || activeComponent === 'history' || activeComponent === 'moneyManagement' || activeComponent === 'rating' ? null :
                <div className="block p-4 xl:ml-80">
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
                        <Loading />
                    )}
                    <div className="mt-12">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : review ? (
                            <EditReviewForm
                                handleSubmit={handleSubmit}
                                imagePreview={imagePreview}
                                image={image}
                                review={review}
                                setNamaPengguna={setNamaPengguna}
                                totalStars={totalStars}
                                renderStar={renderStar}
                                setKomentar={setKomentar}
                                loading={loading}
                            />
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