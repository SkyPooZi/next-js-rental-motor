'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';

const CancelReasonModal = ({ isOpen, onClose, historyId }) => {
    const [image, setImage] = useState(null);
    const [motorData, setMotorData] = useState(null);
    const [cancelModalDetails, setCancelModalDetails] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const getCancelledDetails = async () => {
            try {
                const response = await fetchCancelledModal(token, historyId);

                if (response && response.status === 200) {
                    const data = response.history;
                    console.log('Fetched data:', data);
                    setCancelModalDetails(data);
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
            getCancelledDetails();
        }
    }, [token, historyId, isOpen]);

    if (!isOpen) return null;

    return cancelModalDetails ? (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
            <div className="bg-white w-full max-w-[700px] p-6 rounded-lg shadow-lg">
                <div className='flex flex-col gap-5'>
                    <Label>
                        <span className='font-semibold text-base'>
                            Pembatalan Berhasil
                        </span>
                    </Label>
                    <Label>
                        <span>
                            Pada {cancelModalDetails.tanggal_pembatalan}
                        </span>
                    </Label>
                    <div className='flex flex-row gap-2'>
                        <Image src={image || '/images/motor/dummy.png'} alt='motor' width={100} height={0} />
                        <div className="flex flex-col gap-1 justify-center">
                            <Label>
                                <span className="text-base">
                                    {motorData || 'Motor'}
                                </span>
                            </Label>
                        </div>
                    </div>
                    <div className='w-full flex flex-row gap-5 border border-black opacity-55 rounded-md p-5'>
                        <Label>
                            <span className='text-black text-md'>
                                Alasan : {cancelModalDetails.alasan_pembatalan}
                            </span>
                        </Label>
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
            </div>
        </motion.div>
    ) : null;
};

export default CancelReasonModal;