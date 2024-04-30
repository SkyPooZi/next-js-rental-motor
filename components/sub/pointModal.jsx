import React, { useRef, useEffect } from 'react';
import { PiScroll } from "react-icons/pi";

import { Label } from "@/components/ui/label";

const PointModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-col gap-5 font-medium'>
                    <div className='flex flex-col gap-2'>
                        <span className='font-bold text-lg'>
                            Poin Aktif
                        </span>
                        <div className="border-t border-[#FF4D30]"></div>
                    </div>
                    <div className='flex flex-col py-10 px-1 justify-center items-center'>
                        <span>
                            Anda belum memiliki Poin Tambahan. Sewa motor dan dapatkan
                        </span>
                        <span>
                            akses ke berbagai keuntungannya sekarang!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointModal;
