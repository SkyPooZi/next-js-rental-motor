'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import ReviewCard from '../../../components/sub/reviewCard';

const Detail = () => {
    const router = useRouter();
    const { id } = useParams();
    const [motor, setMotor] = useState(null);
    const [reviews, setReviews] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchMotor = async () => {
            if (!id) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.status === 200) {
                    setMotor(data.listMotor);
                } else {
                    console.error('Unexpected response status:', data.status);
                }
            } catch (error) {
                console.error('Error fetching motor data:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch('https://rental-motor.ruscarestudent.com/api/review/all', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
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

        fetchMotor();
        fetchReviews();
    }, [id]);

    if (!motor) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center mt-10">
                        <h2 className="text-3xl font-bold mb-4 text-black">{motor.nama_motor}</h2>
                        <img
                            src={`https://rental-motor.ruscarestudent.com/storage/${motor.gambar_motor}`}
                            alt={motor.nama_motor}
                            className="w-96 h-auto object-cover rounded-lg mt-20"
                        />
                        <div className="flex justify-between sm:w-full lg:w-1/2 mt-10">
                            <div className="mx-3 md:mx-0 md:mr-20 md:text-left lg:text-right text-black">
                                <p>Daily: <span className="font-bold text-black">{motor.harga_motor_per_1_hari?.toLocaleString('id-ID')}</span></p>
                            </div>
                            <div className="mx-3 md:mx-0 md:mr-0 lg:mx-0 md:text-left lg:text-right text-black">
                                <p className="text-right md:text-left lg:text-right">Weekly: <span className="font-bold text-black">{motor.harga_motor_per_1_minggu?.toLocaleString('id-ID')}</span></p>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <button className="bg-white text-[#FF4D30] border border-[#FF4D30] px-8 py-2 hover:bg-[#FF4D30] hover:text-white transition">Booking Now!</button>
                        </div>
                        <div className="text-center mt-10">
                            <a href="/catalog" className="text-[#FF4D30]">Cek Juga Motor Lainnya</a>
                        </div>
                    </div>

                    <div>
                        <div className="mt-40 text-black">
                            <h3 className="font-bold">Detail:</h3>
                            <p>• Stok: {motor.stok_motor}</p>
                        </div>
                        <div className="mt-10 text-black">
                            <h3 className="font-bold">Fasilitas:</h3>
                            <p>• {motor.fasilitas_motor}</p>
                        </div>
                        <div className="mt-10 text-black">
                            <h3 className="font-bold">Status:</h3>
                            <p className="inline-block bg-green-500 text-white px-2 py-1 rounded-xl">{motor.status_motor}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 mt-8 w-3/4">
                <h2 className="text-2xl font-bold text-black mb-6 text-center">Ulasan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Detail;