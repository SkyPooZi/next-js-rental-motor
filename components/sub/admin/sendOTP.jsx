import React, { useState, useRef } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const OTPPopup = ({
    onVerify,
    isOpen,
    onClose,
    email,
    token,
    id,
    serverOtp,
    setUser,
    setShowNotification,
    setOtpPopupVisible,
    setErrorOtp
}) => {
    const [otp, setOTP] = useState(['', '', '', '', '']);
    const [error, setError] = useState('');
    const [loadingOtp, setLoadingOtp] = useState(false);
    const inputsRef = useRef([]);

    const handleOTPChange = (e, index) => {
        const { value } = e.target;

        if (/^\d$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);
            setError('');

            if (index < otp.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        } else if (value === '') {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);
        } else {
            e.target.value = otp[index];
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');

        if (enteredOTP.length !== 5 || !/^\d{5}$/.test(enteredOTP)) {
            setError('Please enter a valid 5-digit OTP.');
            return;
        }

        try {
            await onVerify(enteredOTP, {
                id,
                email,
                token,
                setErrorOtp,
                setLoadingOtp,
                setShowNotification,
                setUser,
                setOtpPopupVisible,
                serverOtp
            });
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Error verifying OTP. Please try again later.');
        }
    };

    return (
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
    );
};

export default OTPPopup;
