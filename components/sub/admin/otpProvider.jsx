// otpContext.jsx
import React, { createContext, useContext, useState } from 'react';

const OTPContext = createContext();

export const useOTP = () => useContext(OTPContext);

export const OTPProvider = ({ children }) => {
    const [otp, setOTP] = useState('');

    const updateOTP = (value) => {
        setOTP(value);
    };

    return (
        <OTPContext.Provider value={{ otp, updateOTP }}>
            {children}
        </OTPContext.Provider>
    );
};
