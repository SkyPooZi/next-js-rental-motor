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
            className="py-2 px-4 rounded-md before:ease bg-white border-2 text-[#FF4D33] border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-0 before:rotate-45 before:bg-[#FF4D33] before:duration-300 hover:text-white hover:border-2 hover:border-white hover:shadow-white hover:before:h-64 hover:before:-translate-y-32"
        >
            <span className="relative text-base z-10">Hubungi Untuk Tanya Tanya</span>
        </ReactWhatsapp>
    );
};

export default ContactButton;
