'use client';
import * as React from "react"


const ContactButton = () => {
    const handleWhatsAppClick = () => {
      const phoneNumber = '087724120732'; // Replace with your phone number
      const whatsappUrl = `https://wa.me/${phoneNumber}`;
      window.open(whatsappUrl, '_blank');
    };
  
    return (
      <button 
        className="bg-white text-[#FF4D30] py-2 px-4 rounded-full"
        onClick={handleWhatsAppClick}
      >
        Hubungi Untuk Tanya Tanya
      </button>
    );
  };
  
  export default ContactButton;