"use client";

// otpContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the OTP context
const OTPContext = createContext();

// Custom hook for accessing the OTP context
export const useOTP = () => useContext(OTPContext);

// OTPProvider component to wrap the application and provide the OTP context
export const OTPProvider = ({ children }) => {
    // State for OTP
    const [otp, setOTP] = useState('');

    // Function to update OTP
    const updateOTP = (value) => {
        setOTP(value);
    };

    // Value to be provided by the context
    const contextValue = {
        otp,
        updateOTP,
    };

    // Provide the OTP context to the children
    return (
        <OTPContext.Provider value={contextValue}>
            {children}
        </OTPContext.Provider>
    );
};
