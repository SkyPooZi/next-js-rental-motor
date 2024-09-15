'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

import { FaStar, FaRegStar } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@material-tailwind/react";

import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';
import { handleGiveRating } from '@/utils/services/handleGiveRating';

const GiveRatingModal = ({ isOpen, onClose, historyId, onSuccess }) => {
    const totalStars = 5;
    const [showNotification, setShowNotification] = useState(false);
    const [giveRatingModalDetails, setGiveRatingModalDetails] = useState(null);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [penilaian, setPenilaian] = useState(0);
    const [komentar, setKomentar] = useState('');
    const [motor, setMotorData] = useState(null);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(null);
    const router = useRouter();
    const token = Cookies.get('token');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB
                alert('File size must be less than 2MB');
                return;
            }
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const getRatingModalDetails = async () => {
            try {
                const response = await fetchCancelledModal(token, historyId);

                if (response && response.status === 200) {
                    const data = response.history;
                    setGiveRatingModalDetails(data);
                    setImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.list_motor.gambar_motor}`);
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

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await handleGiveRating(historyId, token, penilaian, komentar, file || null);

        if (result.success) {
            setShowNotification(true);
            onSuccess();
            setTimeout(() => {
                setShowNotification(false);
                onClose();
                setLoading(false);
                // window.location.reload();
                router.push('/setting?component=history');
            }, 2000);
        } else {
            console.error('Failed to update reasons:', result.error);
            setLoading(false);
        }
    };

    const handleRatingChange = (newRating) => {
        setPenilaian(newRating);
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
                {isFilled ? <FaStar /> : <FaRegStar />}
            </span>
        );
    };

    const handleFileButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    if (!isOpen) return null;

    return giveRatingModalDetails ? (
        <>
            {showNotification && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md z-50">
                    Ulasan berhasil ditambah!
                </div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, type: 'tween' }}
                className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
                <div className="bg-white w-full max-w-[700px] p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <form method='POST' action='POST' onSubmit={handleConfirm}>
                        <div className='flex flex-col gap-5'>
                            <div className='flex gap-4 items-center'>
                                <Image src='/images/logo.png' alt='Logo' width='25' height='25' className='md:w-auto' />
                                <Label>
                                    <span className='font-semibold text-base'>
                                        Nilai Motor
                                    </span>
                                </Label>
                            </div>
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
                            <div className='w-full flex flex-row gap-5 items-end'>
                                <Label>
                                    <span>
                                        Kualitas Motor
                                    </span>
                                </Label>
                                <div className="flex gap-3 cursor-pointer">
                                    {[...Array(totalStars)].map((_, index) => {
                                        const starValue = index + 1;
                                        return renderStar(starValue);
                                    })}
                                </div>
                            </div>
                            <div className='flex flex-row'>
                                <Textarea label='Komentar Anda' value={komentar} onChange={(e) => setKomentar(e.target.value)} />
                            </div>
                            {imagePreview && (
                                <div className="mr-4">
                                    <img src={imagePreview || null} className="max-w-36 h-auto rounded-md" />
                                    <span className='text-[#FF4D33]'>Gambar tidak boleh lebih dari 2MB</span>
                                </div>
                            )}
                            <div className="relative">
                                <input
                                    type="file"
                                    id="picture"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                />
                                <Button variant='outline' onClick={handleFileButtonClick} className="relative z-10">
                                    <CiImageOn size='20' color='#FF4D33' className="mr-1" />
                                    <Label>
                                        <span className='text-xs text-[#FF4D33]'>
                                            Tambah Foto
                                        </span>
                                    </Label>
                                </Button>
                            </div>
                            <div className='flex flex-row gap-2 justify-end'>
                                <Button onClick={onClose} variant='outline'>
                                    <Label>
                                        <span className='cursor-pointer text-xs text-[#FF4D33]'>
                                            Nanti Saja
                                        </span>
                                    </Label>
                                </Button>
                                <Button
                                    type='submit'
                                    disabled={!komentar || !penilaian || loading}
                                >
                                    {loading ? 'Loading...' : 'Tambah Ulasan'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    ) : null;
};

export default GiveRatingModal;
