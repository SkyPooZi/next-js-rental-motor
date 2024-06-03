// components/OTPPopup.js

import React from 'react';
import { useState, useRef } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import { MdError } from 'react-icons/md';

const OTPPopup = ({ onVerify, isOpen, onClose }) => {
    const [otp, setOTP] = useState(['', '', '', '', '']);
    const [error, setError] = useState('');
    const inputsRef = useRef([]);

    const handleOTPChange = (e, index) => {
        const newOTP = [...otp];
        newOTP[index] = e.target.value;
        setOTP(newOTP);
        setError('');
        if (e.target.value !== '' && index < otp.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');
        if (enteredOTP.length !== 5) {
            setError('Please enter a valid OTP.');
            return;
        }
        onVerify(enteredOTP);
    };

    return (
        <>
            <Dialog size="sm" open={isOpen} onClose={onClose}>
                <DialogHeader>
                    <h5 className="text-2xl font-semibold">Masukkan OTP</h5>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center items-center space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(ref) => (inputsRef.current[index] = ref)}
                                    type="text"
                                    className="w-12 h-12 text-4xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOTPChange(e, index)}
                                />
                            ))}
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </DialogBody>
                <DialogFooter>
                    <div className='flex gap-3'>
                        <Button color="blue" onClick={handleSubmit}>Konfirmasi OTP</Button>
                        <Button color="red" onClick={onClose}>Batal</Button>
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default OTPPopup;
