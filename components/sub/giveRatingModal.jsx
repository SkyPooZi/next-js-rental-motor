import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { FaStar } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';

const GiveRatingModal = ({ isOpen, onClose, className }) => {

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
            <div ref={modalRef} className="bg-white w-full max-w-[700px] p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-col gap-5'>
                    <Label>
                        <span className='font-semibold text-base'>
                            Nilai Motor
                        </span>
                    </Label>
                    <div className='flex flex-row gap-2'>
                        <Image src='/images/motor/dummy.png' alt='motor' width={70} height={0} />
                        <div className="flex flex-col gap-1">
                            <Label>
                                <span className="text-base">
                                    Motor
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
                        <div className='flex flex-row gap-2'>
                            <FaStar color='#FFC107' size='20' />
                            <FaStar color='#FFC107' size='20' />
                            <FaStar color='#FFC107' size='20' />
                            <FaStar color='#FFC107' size='20' />
                            <FaStar color='#FFC107' size='20' />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <Textarea placeholder='Bagikan ulasanmu tentang motor ini untuk membantu penyewa lain' />
                    </div>
                    <div className='flex flex-row'>
                        <Button variant='outline'>
                            <CiImageOn size='20' color='#FF4D33' className="mr-1" />
                            <Label>
                                <span className='text-xs text-[#FF4D33]'>
                                    Tambah Foto
                                </span>
                            </Label>
                        </Button>
                    </div>
                    <div className='flex flex-row gap-2 justify-end'>
                        <Button variant='outline'>
                            <Label>
                                <span className='cursor-pointer text-xs text-[#FF4D33]'>
                                    Nanti Saja
                                </span>
                            </Label>
                        </Button>
                        <Button>
                            <Label>
                                <span className='cursor-pointer text-xs'>
                                    Tambah Ulasan
                                </span>
                            </Label>
                        </Button>
                    </div>
                </div>
                {/* <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Close
                </button> */}
            </div>
        </div>
    );
};

export default GiveRatingModal;
