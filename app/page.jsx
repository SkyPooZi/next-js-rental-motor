'use client';

import React, { useEffect, useState } from 'react';
import NavbarAfter from '@/components/main/NavbarAfter';
import Navbar from '@/components/main/Navbar';
import Footer from '@/components/main/Footer';
import { useRouter } from 'next/navigation';
import SwiperComponent from '@/components/ui/swiper';
import Cookies from 'js-cookie';
import Image from 'next/image';
import ReviewCard from '@/components/sub/ReviewCard';  // Import ReviewCard

const Motor = ({ motor }) => {
    const router = useRouter();

    const handleFormRedirect = () => {
        router.push('/form');
    };

    const handleDetailRedirect = (id) => {
        router.push(`/detail/${id}`);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center">
            <div className="flex justify-center mb-4">
                <Image
                    src={`https://rental-motor.ruscarestudent.com/storage/${motor.gambar_motor}`}
                    alt={motor.nama_motor}
                    width={1000}
                    height={1000}
                    className="rounded-lg"
                />
            </div>
            <div className="text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-black">{motor.nama_motor}</h3>
                <div className="mb-2">
                    <span className="font-bold text-black">Daily: </span>
                    <span className="font-bold text-black">{motor.harga_motor_per_1_hari.toLocaleString('id-ID')}</span>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-black">Weekly: </span>
                    <span className='font-bold text-black'>{motor.harga_motor_per_1_minggu.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex flex-col items-center mb-2">
                    <button onClick={handleFormRedirect} className="bg-[#FF4D30] hover:bg-red-800 text-white py-2 px-4 sm:px-6 rounded mb-2">Booking Now!</button>
                    <button onClick={() => handleDetailRedirect(motor.id)} className="hover:underline text-[#FF4D30] py-2 px-4 sm:px-6">Lihat detail</button>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const token = Cookies.get('token');
    const [selectedFilter, setSelectedFilter] = useState('Rekomendasi');
    const [motors, setMotors] = useState([]);
    const [filteredMotors, setFilteredMotors] = useState([]);
    const [reviews, setReviews] = useState([]);

    const router = useRouter();

    const handleCatalogRedirect = () => {
        router.push('/catalog');
    };

    const handleFormRedirect = () => {
        router.push('/form');
    };

    const navbar = () => {
        if (token == null) {
            return <NavbarAfter />
        } else {
            return <Navbar />
        }
    }

    useEffect(() => {
        const fetchMotors = async () => {
            const token = Cookies.get('token');

            if (!token) {
                console.error('Token not found');
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
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
            }
        };

        fetchMotors();
    }, []);

    useEffect(() => {
        let filtered = motors;

        if (selectedFilter !== 'All') {
            filtered = motors.filter(motor => {
                if (selectedFilter === 'Matic') {
                    return motor.tipe_motor.includes('Matic');
                }
                if (selectedFilter === 'Sport') {
                    return motor.tipe_motor === 'Sport';
                }
                return true;
            });
        }

        setFilteredMotors(filtered);
    }, [selectedFilter, motors]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://rental-motor.ruscarestudent.com/api/review/all');
                const data = await response.json();
                if (data.status === 200) {
                    setReviews(data.review);
                } else {
                    console.error('Unexpected response status:', data.status);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <>
            {navbar()}
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F7F9]">
                <div className="text-center mt-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-black">
                        Jelajahi & <span className="text-[#FF4D30]">Temukan</span>
                    </h1>
                    <p className="text-base mt-4 text-black">
                        Sewa Motor dengan Mudah,<br />
                        Rasakan Kemudahan Tanpa Batas!
                    </p>
                    <div className="flex justify-center items-center mt-6">
                        <button className="px-6 py-2 bg-[#FF4D30] text-white font-semibold rounded hover:bg-red-800 flex items-center" onClick={handleCatalogRedirect}>
                            <img src="/images/icon-calendar.png" alt="Kalender" className="mr-2" />
                            Booking Now
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center mt-10 space-y-4 md:space-y-0">
                    <div className="relative flex items-center md:items-start">
                        {/* swiper */}
                        <div className="w-full max-w-4xl mt-8">
                            <SwiperComponent />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center bg-white mt-[100px] mb-[100px]">
                    <div className="bg-white w-full flex flex-col items-center p-6 md:flex-row md:justify-between md:p-12">
                        <div className="md:w-1/2 flex justify-center">
                            <img src="/images/motor/dummy.png" alt="Motorbike" className="w-full md:w-3/4" />
                        </div>
                        <div className="text-center md:text-left md:w-1/2 mt-6 md:mt-0">
                            <h1 className="text-3xl font-bold mb-4 text-[#FF4D30]">Puaskan Petualangan Anda!</h1>
                            <p className="text-xl mb-4 text-[#FF4D30]">Diskon Gila di Sewa Motor Kudus!</p>
                            <p className="text-lg">Tersedia Berbagai Jenis Motor untuk Memenuhi Kebutuhan Petualangan Anda!</p>
                            <div className="flex justify-center md:justify-start mt-6 space-x-4">
                                <img src="/images/motor/dummy.png" alt="Motorbike 1" className="w-16" />
                                <img src="/images/motor/dummy.png" alt="Motorbike 2" className="w-16" />
                                <img src="/images/motor/dummy.png" alt="Motorbike 3" className="w-16" />
                                <img src="/images/motor/dummy.png" alt="Motorbike 4" className="w-16" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-[#FF4D30] text-white py-8 w-full">
                    <p className="text-lg text-center mt-2">Rencanakan perjalanan Anda sekarang</p>
                    <h1 className="text-3xl font-bold text-center">Penyewaan Cepat & Mudah</h1>
                    <div className="flex justify-center items-center mt-8 w-full">
                        <div className="flex flex-col items-center mx-2">
                            <img src="/images/cs.png" alt="24/7" className="mb-1" style={{ margin: '5px' }} />
                            <p className="mt-2 text-center">24/7 Customer Service</p>
                        </div>
                        <div className="flex flex-col items-center mx-2">
                            <img src="/images/deliv.png" alt="Free Delivery" className="mb-1" style={{ margin: '5px' }} />
                            <p className="mt-2 text-center">Gratis Pengiriman & Pengambilan Area Kudus</p>
                        </div>
                        <div className="flex flex-col items-center mx-2">
                            <img src="/images/wallet.png" alt="Best Price" className="mb-1" style={{ margin: '5px' }} />
                            <p className="mt-2 text-center">Harga Terbaik Mulai Dari 50K</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 mt-[130px]">
                    <div className="flex flex-col items-center p-5 min-h-screen w-full overflow-x-hidden">
                        <div className="w-full max-w-6xl mb-5">
                            <div className="flex justify-between items-center">
                                <h1 className="text-sm sm:text-2xl lg:text-3xl font-bold text-black">Pilihan Motor</h1>
                                <div className="flex gap-1 sm:gap-3 ">
                                    {['All', 'Matic', 'Sport'].map(filter => (
                                        <button
                                            key={filter}
                                            className={`py-2 px-3 sm:px-4 lg:px-6 border-b-2 ${selectedFilter === filter ? 'border-[#FF4D30]' : 'border-transparent'}`}
                                            onClick={() => setSelectedFilter(filter)}
                                        >
                                            <span className="text-sm sm:text-base lg:text-lg text-black">{filter}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl bg-white">
                            {filteredMotors.map((motor, index) => (
                                <Motor key={index} motor={motor} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 mt-[130px]">
                    <h2 className="text-2xl font-bold mb-6 text-center text-black">Ulasan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </div>
                </div>

                <div className="p-4 mt-12 bg-white shadow-lg w-full">
                    <h2 className="text-3xl font-bold mb-6 text-center">Galeri</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
                        <div className="row-span-1">
                            <div className="w-full h-full">
                                <img src="/images/gallery/pexels-pixabay-163789.jpg" alt="Gallery Image 1" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full h-full">
                                <img src="/images/gallery/pexels-jamphotography-2626665.jpg" alt="Gallery Image 2" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full h-full">
                                <img src="/images/gallery/pexels-giorgio-de-angelis-482403-1413412.jpg" alt="Gallery Image 3" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full h-full">
                                <img src="/images/gallery/pexels-nicholas-dias-1119542-2116475.jpg" alt="Gallery Image 4" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full h-full">
                                <img src="/images/gallery/pexels-pragyanbezbo-1715193.jpg" alt="Gallery Image 5" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full h-full">
                                <img src="/images/gallery/pexels-pixabay-104842.jpg" alt="Gallery Image 6" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
}