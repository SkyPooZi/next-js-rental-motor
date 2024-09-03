'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReviewMotor from '@/components/sub/detail/reviewMotor';
import DetailMotor from '@/components/sub/detail/detailMotor';
import Navbar from '@/components/sub/main/NavbarAfter';
import Footer from '@/components/sub/main/Footer';
import { fetchMotorDetails, fetchMotorReviews } from '@/utils/fetchDetail';
import Cookies from 'js-cookie';

const Detail = () => {
    const { id } = useParams();
    const [motor, setMotor] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMotorDetails = async () => {
            if (!id) return;
            try {
                const motorData = await fetchMotorDetails(id);
                setMotor(motorData);

                // Set the 'isHidden' cookie to '1' or 'null'
                if (motorData.is_hidden === 1) {
                    Cookies.set('isHidden', '1');
                } else {
                    Cookies.set('isHidden', null);
                }
                console.log(Cookies.get('isHidden'));

            } catch (error) {
                setError('An error occurred while fetching motor data.');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const loadReviews = async () => {
            try {
                const reviewData = await fetchMotorReviews();
                setReviews(reviewData);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        loadMotorDetails();
        loadReviews();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FF4D33]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!motor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Motor details not found.</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center bg-[#F6F7F9] px-4 sm:px-8 lg:px-16 py-8">
                <DetailMotor motor={motor} />

                <div className="w-full mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                    {reviews.length > 0 ? (
                        <ReviewMotor reviews={reviews} />
                    ) : (
                        <p className="text-gray-500">No reviews available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Detail;
