'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';
import { fetchReview } from '@/utils/services/fetchReview';

const SeeRatingModal = ({ isOpen, onClose, historyId }) => {
    const [seeRatingModalDetails, setSeeRatingModalDetails] = useState(null);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [motor, setMotorData] = useState(null);
    const [user, setUserData] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [ulasanId, setUlasanId] = useState(null);
    const [review, setReview] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const getRatingModalDetails = async () => {
            try {
                const response = await fetchCancelledModal(token, historyId);

                if (response && response.status === 200) {
                    const data = response.history;
                    setSeeRatingModalDetails(data);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.list_motor.gambar_motor}`);
                    setUserImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.user.gambar}`);
                    setUserData(data.user);
                    setUlasanId(data.ulasan_id);
                    setMotorData(data.list_motor.nama_motor);
                } else {
                    console.log('No data received or incorrect status');
                }
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            }
        };

        if (historyId && isOpen) {
            getRatingModalDetails();
        }
    }, [token, historyId, isOpen]);

    useEffect(() => {
        const getReviewDetails = async () => {
            try {
                const response = await fetchReview(token, ulasanId);

                if (response && response.status === 200) {
                    const data = response.review;
                    setReview({
                        penilaian: data.penilaian,
                        gambar: data.gambar,
                        komentar: data.komentar,
                    });
                } else {
                    console.log('No data received or incorrect status');
                }
            } catch (error) {
                console.error('Failed to fetch review details:', error);
            }
        };

        if (ulasanId && isOpen) {
            getReviewDetails();
        }
    }, [token, ulasanId, isOpen]);

    if (!isOpen) return null;

    return seeRatingModalDetails ? (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-[700px] p-6 rounded-lg shadow-lg">
                <div className='flex flex-col gap-5'>
                    <Label>
                        <span className='font-semibold text-base'>
                            Ulasan Saya
                        </span>
                    </Label>
                    <div className='flex flex-row gap-2'>
                        <Image src={image || '/images/motor/dummy.png'} alt='motor' width={100} height={0} />
                        <div className="flex flex-col gap-1">
                            <Label>
                                <span className="text-base">
                                    {motor || 'Motor'}
                                </span>
                            </Label>
                        </div>
                    </div>
                    <div className='w-full flex flex-row gap-5 border p-5'>
                        <Avatar>
                            <AvatarImage src={userImage || 'https://github.com/shadcn.png'} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col gap-2'>
                            <Label>
                                <span className='text-base'>
                                    {user?.nama_pengguna || 'User'}
                                </span>
                            </Label>
                            <div className="flex gap-3">
                                {Array.from({ length: review?.penilaian || 0 }, (_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                                        <path d="M12 .587l3.668 7.425 8.332 1.212-6.042 5.888 1.426 8.31L12 18.897l-7.384 3.925 1.426-8.31L.412 9.224l8.332-1.212L12 .587z" />
                                    </svg>
                                ))}
                            </div>
                            <Label>
                                <span className='leading-5'>
                                    {review?.komentar || 'Ulasan'}
                                </span>
                            </Label>
                            <div className='flex flex-row gap-3'>
                                {review?.gambar ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${review.gambar}`}
                                        height={1000}
                                        width={1000}
                                        className='max-w-[100px]'
                                        alt="Review Image" // Adding alt text for accessibility
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 justify-end'>
                        <Button onClick={onClose}>
                            <Label>
                                <span className='cursor-pointer text-xs'>
                                    OK
                                </span>
                            </Label>
                        </Button>
                    </div>
                </div>
                {/* <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Close
                </button> */}
            </div>
        </motion.div>
    ) : (
        null
    );
};

export default SeeRatingModal;