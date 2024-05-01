import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { FaStar } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const SeeRatingModal = ({ isOpen, onClose, className }) => {

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
                            Ulasan Saya
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
                    <div className='w-full flex flex-row gap-5 border p-5'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col gap-2'>
                            <Label>
                                <span className='text-xs'>
                                    Nama User
                                </span>
                            </Label>
                            <div className='flex flex-row gap-2'>
                                <FaStar size='20' color='#FFC107' />
                                <FaStar size='20' color='#FFC107' />
                                <FaStar size='20' color='#FFC107' />
                                <FaStar size='20' color='#FFC107' />
                                <FaStar size='20' color='#FFC107' />
                            </div>
                            <Label>
                                <span className='leading-5'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis fuga distinctio libero tempora cum quia quidem non praesentium quos commodi?
                                </span>
                            </Label>
                            <div className='flex flex-row gap-3'>
                                <Image src='/images/motor/review.png' height={1000} width={1000} className='max-w-[100px]' />
                                <Image src='/images/motor/review.png' height={1000} width={1000} className='max-w-[100px]' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 justify-end'>
                        <Button>
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
        </div>
    );
};

export default SeeRatingModal;