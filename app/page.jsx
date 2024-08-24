'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';

import '../styles/slideInFoward.css';
import '../styles/slideInAnimation.css';

import { Spinner, Button } from "@material-tailwind/react";
import GallerySwiper from '@/components/sub/gallerySwiper';
import Navbar from '@/components/main/NavbarAfter';
import Footer from '@/components/main/Footer';
import SwiperComponent from '@/components/ui/swiper';
import ReviewSwiper from '@/components/sub/reviewSwiper';
import ReviewCard from '@/components/sub/ReviewCard';
import ProductSlider from '@/components/ui/swiperNew';
import HeaderHomePage from '@/components/sub/headerHomepage';
import HorizontalScroll from '@/components/ui/horizontalScroll';
import ScrollTextAnimation from '@/components/ui/scrollTextAnimation';

const Motor = ({ motor }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const router = useRouter();

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleButtonClick = () => {
        if (motor.status_motor !== 'Tertunda' && motor.status_motor !== 'Tidak Tersedia') {
            router.push(`/form/${motor.id}`);
        }
    };

    return (
        <>
            <div className="border w-fit border-gray-300 bg-white rounded-lg p-4 shadow-md flex flex-col items-start">
                <div className="flex justify-center mb-4">
                    {imageLoading && (
                        <div className="flex items-center justify-center w-72 h-72">
                            <Spinner color="orange" className="h-12 w-12" />
                        </div>
                    )}
                    <Image
                        src={`https://rental-motor.ruscarestudent.com/storage/${motor.gambar_motor}`}
                        alt={motor.nama_motor}
                        width={1000}
                        height={1000}
                        priority={true}
                        className={`rounded-lg w-72 h-72 object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoadingComplete={handleImageLoad}
                    />
                </div>
                <div className="w-full text-center px-5">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5 text-[#ff4d30]">
                        {motor.nama_motor}
                    </h3>
                    <div className='flex justify-between'>
                        <div className="mb-2 flex flex-col gap-2">
                            <span className="font-bold text-black/70">Harian : </span>
                            <span className="font-bold">{motor.harga_motor_per_1_hari.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2 text-end">
                            <span className="font-bold text-black/70">Mingguan : </span>
                            <span className='font-bold'>{motor.harga_motor_per_1_minggu.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mb-2">
                        <Button
                            onClick={handleButtonClick}
                            disabled={motor.status_motor === 'Tertunda' || motor.status_motor === 'Tidak Tersedia'}
                            className={`before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32 ${motor.status_motor === 'Tertunda' || motor.status_motor === 'Tidak Tersedia' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="relative text-base z-10">Pesan Sekarang!</span>
                        </Button>
                        <Link href={`/detail/${motor.id}`}>
                            <button className="hover:underline text-[#FF4D30] py-2 px-4 sm:px-6">Lihat detail</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function Home() {
    const token = Cookies.get('token');
    const [selectedFilter, setSelectedFilter] = useState('Semua');
    const [motors, setMotors] = useState([]);
    const [filteredMotors, setFilteredMotors] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loadingMotor, setLoadingMotor] = useState(true);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const fetchMotors = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status === 200) {
                    setMotors(data.listMotor);
                    setFilteredMotors(data.listMotor);
                } else {
                    console.error('Unexpected response status:', data.status);
                }
            } catch (error) {
                console.error('Error fetching motor data:', error);
            } finally {
                setLoadingMotor(false);
            }
        };

        fetchMotors();
    }, []);

    useEffect(() => {
        let filtered = motors;

        if (selectedFilter !== 'Semua') {
            filtered = motors.filter(motor => {
                if (selectedFilter === 'Matic') {
                    return motor.tipe_motor.includes('Matic');
                }
                if (selectedFilter === 'Sport') {
                    return motor.tipe_motor === 'Sport';
                }   
                return true;
            });
        } else {
            filtered = motors.slice(0, 3);
        }

        setFilteredMotors(filtered);
        setAnimate(false);
        setTimeout(() => setAnimate(true), 0);
    }, [selectedFilter, motors]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.status === 200) {
                    const filteredReviews = data.review.filter(review => review.penilaian === 5);
                    setReviews(filteredReviews);
                } else {
                    console.error('Unexpected response status:', data.status);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [token]);

    if (loadingMotor) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
        </div>
    }

    return (
        <>
            <Navbar />
            <div className='md:m-view-pc overflow-x-hidden m-4 mt-10 justify-center mb-5'>
                <HeaderHomePage />
            </div>
            <div className='overflow-x-hidden'>
                <ProductSlider />
            </div>
            <div className=''>
                <ScrollTextAnimation />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F7F9]">
                <div className="mt-[130px]">
                    <div className="flex flex-col items-center p-5">
                        <div className="w-full max-w-6xl mb-5">
                            <div className="flex justify-between items-center">
                                <h1 className="text-sm sm:text-2xl lg:text-3xl font-bold">Pilihan Motor</h1>
                                <div className="flex gap-1 sm:gap-3 mb-4">
                                    {['Semua', 'Matic', 'Sport'].map(filter => (
                                        <button
                                            key={filter}
                                            className={`py-2 px-3 sm:px-4 lg:px-6 border-b-2 border-transparent border-slide hover:text-[#ff4d30] ${selectedFilter === filter ? 'border-slide-active text-[#ff4d30]' : ''}`}
                                            onClick={() => setSelectedFilter(filter)}
                                        >
                                            <span className="text-sm sm:text-base lg:text-lg">{filter}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl overflow-x-hidden ${animate ? 'slide-in' : ''}`}>
                            {filteredMotors.map((motor, index) => (
                                <Motor key={index} motor={motor} />
                            ))}
                        </div>
                    </div>
                </div>

                <Link href='/catalog' className='mb-7'>
                    <Button className="before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
                        <span className="relative text-base z-10">Cek Motor Lainnya</span>
                    </Button>
                </Link>

                <div className="w-full overflow-x-hidden">
                    <ReviewSwiper reviews={reviews} />
                </div>

                <div className="p-4 mt-12 bg-white shadow-lg w-full">
                    <GallerySwiper />
                </div>
            </div>
            <Footer />
        </>
    );
}