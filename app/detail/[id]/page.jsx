'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReviewMotor from '@/components/sub/detail/reviewMotor';
import DetailMotor from '@/components/sub/detail/detailMotor';

import Navbar from '@/components/main/NavbarAfter';
import Footer from '@/components/main/Footer';

const Detail = () => {
    const { id } = useParams();
    const [motor, setMotor] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMotor = async () => {
            if (!id) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/list-motor/detail/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
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

        fetchMotor();
        fetchReviews();
    }, [id]);

    if (!motor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center bg-[#F6F7F9]">
                <DetailMotor motor={motor} />

                <div className="w-full overflow-x-hidden">
                    <ReviewMotor reviews={reviews} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Detail;