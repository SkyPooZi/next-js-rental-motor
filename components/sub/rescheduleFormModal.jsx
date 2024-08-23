'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PiScroll } from "react-icons/pi";

const Modal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options).replace('.', '');
    }

    const todayFormatted = formatDate(today);
    const tomorrowFormatted = formatDate(tomorrow);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}
        >
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-col gap-5 bg-white font-medium'>
                    <div className='flex flex-row gap-2 items-center bg-white'>
                        <PiScroll className='bg-white' size='25' />
                        <span className='font-semibold text-black bg-white'>
                            Kebijakan Penjadwalan Ulang
                        </span>
                    </div>
                    <div className='flex flex-col gap-1 items-start font-semibold bg-white'>
                        <span className='font-semibold text-[#00875A] bg-white'>
                            Penjadwalan Ulang Gratis sebelum
                        </span>
                        {todayFormatted}
                    </div>
                    <div className='flex flex-col gap-1 items-start font-semibold bg-white'>
                        <span className='font-semibold text-[#E80D12] bg-white'>
                            Biaya Penjadwalan Ulang Rp, 100.000 berlaku setelah
                        </span>
                        {tomorrowFormatted}
                    </div>
                    Pemesanan ini bisa dijadwalkan ulang, namun dikenakan biaya setelah {tomorrowFormatted}.
                </div>
                {/* <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Close
                </button> */}
            </div>
        </motion.div>
    );
};

export default Modal;
