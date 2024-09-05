'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

import { MdDone, MdClose } from "react-icons/md";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { handleCancelled } from '@/utils/services/handleCancelled';
import { fetchCancelledModal } from '@/utils/services/fetchCancelledModal';

const PaymentWaitModal = ({ isOpen, onClose, historyId }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [historyDetail, setHistoryDetail] = useState('');
    const [point, setPoint] = useState(0);
    const [idUser, setIdUser] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter();
    const token = Cookies.get('token');

    const handleCheckboxChange = (reason) => {
        setSelectedReason(reason);
    };

    useEffect(() => {
        const getHistoryDetail = async () => {
            try {
                const response = await fetchCancelledModal(token, historyId);

                if (response && response.status === 200) {
                    const data = response.history;
                    setHistoryDetail(data);
                    setPoint(data.point);
                    setIdUser(data.pengguna_id);
                } else {
                    console.log('No data received or incorrect status');
                }
            } catch (error) {
                console.error('Failed to fetch payment details:', error);
            }
        };

        getHistoryDetail();
    }, [token, historyId]);

    const handleConfirm = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const result = await handleCancelled(token, historyId, selectedReason, currentDate);

        if (result.success) {
            if (point > 0) {
                console.log(`Returning points: ${point} to user ${idUser}`);

                try {
                    const pointResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/edit/${idUser}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ point: point }),
                    });

                    if (!pointResponse.ok) {
                        throw new Error('Failed to return points');
                    }

                    console.log(`Points returned successfully: ${point} to user ${idUser}`);
                } catch (error) {
                    console.error('Error returning points:', error);
                }
            }

            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                onClose();
                router.push('/setting?component=history');
                router.refresh();
                // window.location.reload();
            }, 1000);
        } else {
            console.error('Failed to update reasons:', result.error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {showNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md flex items-center shadow-lg z-50">
                    <span>Data berhasil diubah</span>
                    <MdDone className="ml-2 text-white" />
                </div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, type: 'tween' }}
                className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-25">
                <div className="bg-white w-full max-w-[700px] p-6 rounded-lg shadow-lg relative">
                    <MdClose
                        className="absolute top-4 right-4 text-gray-600 cursor-pointer"
                        size={24}
                        onClick={onClose}
                    />
                    <div className='flex flex-col gap-5'>
                        <Label>
                            <span className='font-medium text-lg'>
                                Pilih Alasan Pembatalan
                            </span>
                        </Label>
                        <div className='flex flex-col gap-3'>
                            <Label className='flex items-center gap-2 cursor-pointer'>
                                <Checkbox id="perubahan-rencana" checked={selectedReason === 'Perubahan Rencana'} onCheckedChange={() => handleCheckboxChange('Perubahan Rencana')} />
                                <span className='text-base'>
                                    Perubahan Rencana
                                </span>
                            </Label>
                            <Label className='flex items-center gap-2 cursor-pointer'>
                                <Checkbox id="kesalahan-pemesanan" checked={selectedReason === 'Kesalahan Pemesanan'} onCheckedChange={() => handleCheckboxChange('Kesalahan Pemesanan')} />
                                <span className='text-base'>
                                    Kesalahan Pemesanan
                                </span>
                            </Label>
                            <Label className='flex items-center gap-2 cursor-pointer'>
                                <Checkbox id="penawaran-lebih-baik" checked={selectedReason === 'Menemukan Penawaran Yang Lebih Baik'} onCheckedChange={() => handleCheckboxChange('Menemukan Penawaran Yang Lebih Baik')} />
                                <span className='text-base'>
                                    Menemukan Penawaran Yang Lebih Baik
                                </span>
                            </Label>
                            <Label className='flex items-center gap-2 cursor-pointer'>
                                <Checkbox id="tidak-puas-layanan" checked={selectedReason === 'Tidak Puas Dengan Layanan'} onCheckedChange={() => handleCheckboxChange('Tidak Puas Dengan Layanan')} />
                                <span className='text-base'>
                                    Tidak Puas Dengan Layanan
                                </span>
                            </Label>
                        </div>
                        <Button onClick={handleConfirm}>
                            <Label>
                                <span className='cursor-pointer text-base'>
                                    Konfirmasi
                                </span>
                            </Label>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default PaymentWaitModal;