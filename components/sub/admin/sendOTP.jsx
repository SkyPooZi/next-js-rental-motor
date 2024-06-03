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
        const { value } = e.target;

        // Check if the input is a single digit
        if (/^\d$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);
            setError('');

            // Move to the next input if it exists
            if (index < otp.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        } else if (value === '') {
            // Allow deletion of input
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);
        } else {
            // Prevent invalid input
            e.target.value = otp[index];
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
                // Move to the previous input if it exists
                if (index > 0) {
                    inputsRef.current[index - 1].focus();
                }
            } else {
                const newOTP = [...otp];
                newOTP[index] = '';
                setOTP(newOTP);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');

        if (enteredOTP.length !== 5|| !/^\d{5}$/.test(enteredOTP)) {
            setError('Please enter a valid 5-digit OTP.');
            return;
        }

        onVerify(enteredOTP)
        .then((isCorrect) => {
            if (!isCorrect) {
                setError('Incorrect OTP. Please try again.');
                // Handle incorrect OTP scenario here (e.g., reset the OTP input)
                setOTP(['', '', '', '', '']); // Reset OTP input
            } else {
                // Handle correct OTP scenario here
                // For example, you can navigate to another page or perform other actions
                console.log('OTP is correct. Proceed with further actions...');
            }
        })
        .catch((error) => {
            // Handle error from OTP verification API call
            console.error('Error verifying OTP:', error);
            setError('Error verifying OTP. Please try again later.');
        });
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
                                    className="w-12 h-12 overflow-hidden text-4xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    pattern="\d*"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOTPChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onInput={(e) => {
                                        if (e.target.value.length > 1) {
                                            e.target.value = e.target.value[0];
                                        }
                                    }}
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
