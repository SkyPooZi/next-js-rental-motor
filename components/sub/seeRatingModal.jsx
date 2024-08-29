import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';
import { fetchReview } from '@/utils/services/fetchReview';

const SeeRatingModal = ({ isOpen, onClose, historyId }) => {
    const [seeRatingModalDetails, setSeeRatingModalDetails] = useState(null);
    const [image, setImage] = useState('');
    const [motor, setMotorData] = useState(null);
    const [user, setUserData] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [ulasanId, setUlasanId] = useState(null);
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const token = Cookies.get('token');

    // Fetch modal details when modal opens and historyId changes
    useEffect(() => {
        const getRatingModalDetails = async () => {
            if (historyId && isOpen) {
                setLoading(true); // Start loading

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
                } finally {
                    setLoading(false); // Stop loading after data is fetched
                }
            }
        };

        getRatingModalDetails();
    }, [token, historyId, isOpen]);

    // Fetch review details when ulasanId is set and modal is open
    useEffect(() => {
        const getReviewDetails = async () => {
            if (ulasanId && isOpen) {
                setLoading(true); // Start loading

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
                } finally {
                    setLoading(false); // Stop loading after data is fetched
                }
            }
        };

        getReviewDetails();
    }, [token, ulasanId, isOpen]);

    if (!isOpen || !seeRatingModalDetails) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="bg-white w-full max-w-[700px] p-6 rounded-lg shadow-lg">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="loader"></div>
                    </div>
                ) : (
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
                            <Avatar className="w-10 h-10">
                                {user?.gambar ? (
                                    <AvatarImage
                                        className="w-full h-full object-cover"
                                        src={
                                            user.google_id || user.facebook_id
                                                ? user.gambar // Use the link directly from the response if google_id or facebook_id is not null
                                                : `${process.env.NEXT_PUBLIC_API_URL}/storage/${user.gambar}` // Use the local storage link if both are null
                                        }
                                    />
                                ) : (
                                    <AvatarFallback>o_o</AvatarFallback>
                                )}
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
                                            alt="Review Image"
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
                )}
            </div>
        </motion.div>
    );
};

export default SeeRatingModal;
