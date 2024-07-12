'use client';

import React, { useEffect } from 'react';
import NavbarAfter from '@/components/main/NavbarAfter';
import Navbar from '@/components/main/Navbar';
import Footer from '@/components/main/Footer';
import { useRouter } from 'next/navigation';
import SwiperComponent from '@/components/ui/swiper';
import Cookies from 'js-cookie';

export default function Home() {

    const router = useRouter();

    const handleCatalogRedirect = () => {
        router.push('/catalog');
    };

    const handleFormRedirect = () => {
        router.push('/form');
    };

    const handleLogout = () => {
        // Remove the token from cookies
        Cookies.remove('token');
        // Redirect to the login page
        router.push('/login');
    };

    return (
        <>

            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F7F9]">
                <div className="text-center mt-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-black">
                        Jelajahi & <span className="text-[#FF4D30]">Temukan</span>
                    </h1>
                    <p className="text-base mt-4 text-black">
                        Sewa Motor dengan Mudah,<br />
                        Rasakan Kemudahan Tanpa Batas!
                    </p>
                    <button onClick={handleLogout} className="text-black bg-blue-gray-300">
                        Logout
                    </button>
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

                <div className="flex flex-col items-center bg-white min-h-screen mt-[130px]">
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

                <div className="flex flex-col items-center justify-center bg-[#FF4D30] text-white py-8 w-full -mt-16">
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
                    <div className="flex justify-between items-center flex-col md:flex-row mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left text-black">Pilihan Motor</h2>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="text-[#FF4D30] border-b-2 border-[#FF4D30]">Rekomendasi</a>
                            <a href="#" className="text-gray-600">Matic</a>
                            <a href="#" className="text-gray-600">Manual</a>
                        </div>
                    </div>


                    <div className="bg-white p-4 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black">
                            {Array(3)
                                .fill()
                                .map((_, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow p-4">
                                        <img
                                            src="/images/motor/dummy.png"
                                            alt="Motor"
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        />
                                        <h3 className="text-center font-bold my-2 mt-4 md:mt-10">Nama Motor</h3>
                                        <div className="flex justify-around my-2 mt-4">
                                            <p>Daily: <br />50K</p>
                                            <p>Weekly: <br />320K</p>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button onClick={handleFormRedirect} className="bg-white text-[#FF4D30] border border-[#FF4D30] px-8 py-2 font-bold hover:bg-[#FF4D30] hover:text-white transition mt-10">Booking Now!</button>
                                            <p onClick={handleCatalogRedirect} className="text-[#FF4D30] mt-2">Lihat detail</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>


                <div className="p-8 mt-[130px]">
                    <h2 className="text-2xl font-bold mb-6 text-center text-black">Ulasan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array(3).fill().map((_, index) => (
                            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                                    <div className="ml-4">
                                        <div className="font-bold text-xl text-black">Adam Aji Langit</div>
                                        <div className="flex">
                                            <span className="text-yellow-500">&#9733;</span>
                                            <span className="text-yellow-500">&#9733;</span>
                                            <span className="text-yellow-500">&#9733;</span>
                                            <span className="text-yellow-500">&#9733;</span>
                                            <span className="text-gray-300">&#9733;</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex space-x-2">
                                        <img src="/images/motor/review.png" alt="Review Image" className="object-cover w-20 h-20" />
                                        <img src="/images/motor/review.png" alt="Review Image" className="object-cover w-20 h-20" />
                                    </div>
                                </div>
                                <p className="text-gray-700 text-base">
                                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.
                                </p>
                            </div>
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
            </div>
            <Footer />
        </>
    );
}