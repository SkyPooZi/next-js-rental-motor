'use client';

import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

import { MdDone, MdClose } from "react-icons/md";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { handleCancelled } from '@/utils/services/handleCancelled';

const PaymentWaitModal = ({ isOpen, onClose, historyId }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter();
    const token = Cookies.get('token');

    const handleCheckboxChange = (reason) => {
        setSelectedReason(reason);
    };

    const handleConfirm = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const result = await handleCancelled(token, historyId, selectedReason, currentDate);

        if (result.success) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                onClose();
                window.location.reload();
                router.push('/setting?component=history');
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
                transition={{ duration: 0.3, type: 'tween'}}
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