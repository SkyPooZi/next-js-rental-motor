// components/Header.jsx
import React from 'react';

const Header = () => {
    return (
        <>
            <h1 className="text-3xl md:text-6xl font-bold text-black">
                Jelajahi & <span className="text-[#FF4D30]">Temukan</span>
            </h1>
            <p className="text-base mt-4 text-black">
                Sewa Motor dengan Mudah,<br />
                Rasakan Kemudahan Tanpa Batas!
            </p>
            <div className="flex justify-center items-center mt-6">
                <button className="relative px-4 py-2 bg-white border-4 border-solid border-[#FF4D30] rounded-lg text-[#FF4D30] font-semibold text-lg flex items-center overflow-hidden transition-all duration-300 group">
                    <span className="relative z-10 transition-colors duration-300 delay-500 group-hover:text-white">Booking Now</span>
                    <span className="absolute inset-0 bg-[#FF4D30] transition-all duration-300 transform origin-center scale-x-0 group-hover:scale-x-110 group-hover:skew-x-6"></span>
                </button>
            </div>

        </>
    );
};

export default Header;
