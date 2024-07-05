'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperComponent = () => {
    const [motorcycles, setMotorcycles] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchMotorcycles = async () => {
            const token = localStorage.getItem('token');
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/all`;

            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.status === 200 && Array.isArray(data.listMotor)) {
                    setMotorcycles(data.listMotor);
                } else {
                    console.error('Unexpected response format:', data);
                    setMotorcycles([]);
                }
            } catch (error) {
                console.error('Error fetching motorcycles:', error);
                setMotorcycles([]);
            }
        };

        fetchMotorcycles();
    }, []);

    return (
        <div className="relative w-full max-w-screen-lg mx-auto p-4">
            <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                loop
                className="mySwiper"
            >
                {motorcycles.map((motorcycle) => (
                    <SwiperSlide key={motorcycle.id}>
                        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                            <div className="relative w-full h-60 sm:h-80 lg:h-96 mb-4">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${motorcycle.gambar_motor}`}
                                    alt={motorcycle.nama_motor}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                />
                            </div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-2">
                                {motorcycle.nama_motor}
                            </h3>
                            <p className="text-black">{motorcycle.tipe_motor}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute top-1/2 transform -translate-y-1/2 left-4 swiper-button-prev-custom z-10">
                <button
                    className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-4 swiper-button-next-custom z-10">
                <button
                    className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SwiperComponent;