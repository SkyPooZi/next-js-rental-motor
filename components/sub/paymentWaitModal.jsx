import React, { useState, useRef, useEffect } from 'react';

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

const PaymentWaitModal = ({ isOpen, onClose, className }) => {

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
                        <span className='font-medium text-base'>
                            Pilih Alasan Pembatalan
                        </span>
                    </Label>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-row items-end gap-2'>
                            <Checkbox id="terms" />
                            <Label>
                                <span>
                                    Alasan 1
                                </span>
                            </Label>
                        </div>
                        <div className='flex flex-row items-end gap-2'>
                            <Checkbox id="terms" />
                            <Label>
                                <span>
                                    Alasan 2
                                </span>
                            </Label>
                        </div>
                        <div className='flex flex-row items-end gap-2'>
                            <Checkbox id="terms" />
                            <Label>
                                <span>
                                    Alasan 3
                                </span>
                            </Label>
                        </div>
                        <div className='flex flex-row items-end gap-2'>
                            <Checkbox id="terms" />
                            <Label>
                                <span>
                                    Alasan 4
                                </span>
                            </Label>
                        </div>
                    </div>
                    <Button>
                        <Label>
                            <span className='cursor-pointer text-xs'>
                                KONFIRMASI
                            </span>
                        </Label>
                    </Button>
                </div>
                {/* <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Close
                </button> */}
            </div>
        </div>
    );
};

export default PaymentWaitModal;