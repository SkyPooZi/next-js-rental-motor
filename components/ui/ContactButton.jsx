'use client';
import * as React from "react";
import ReactWhatsapp from 'react-whatsapp';

const ContactButton = () => {
    const phoneNumber = '+62 877-2412-0732';
    const message = 'Halo, saya ingin bertanya mengenai website Rental Motor Kudus';

    return (
        <ReactWhatsapp 
            number={phoneNumber}
            message={message}
            className="bg-white text-[#FF4D30] py-2 px-4 rounded-full"
        >
            Hubungi Untuk Tanya Tanya
        </ReactWhatsapp>
    );
};

export default ContactButton;
