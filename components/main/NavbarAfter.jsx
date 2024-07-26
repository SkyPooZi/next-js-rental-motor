"use client";

import { React, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [activeLink, setActiveLink] = useState('/');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    return (
        <header className="bg-white shadow-lg">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" passHref>
                            <div className="flex items-center gap-1.5 cursor-pointer">
                                <Image src='/images/logo.png' alt='Logo' width='38' height='38' />
                                <span className='font-bold hidden md:block'>Rental Motor Kudus</span>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/" className={activeLink === '/' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/')}>Beranda</Link>
                        <Link href="/catalog" className={activeLink === '/catalog' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/catalog')}>Daftar Motor</Link>
                        <Link href="/about" className={activeLink === '/about' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/about')}>Tentang Kami</Link>
                        <Link href="/terms" className={activeLink === '/terms' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/terms')}>Syarat & Ketentuan</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {!isLoggedIn && (
                            <button
                                onClick={handleLoginClick}
                                className="px-4 py-2 text-white bg-[#FF4D30] rounded"
                            >
                                Login
                            </button>
                        )}
                        <div className="block lg:hidden">
                            <button className="border border-white p-2 rounded-md">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}