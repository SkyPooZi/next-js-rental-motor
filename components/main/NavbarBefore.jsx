import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHistory } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { RiLogoutCircleLine } from "react-icons/ri";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from '@/components/ui/label';

export default function NavbarAfter() {
    const { setTheme } = useTheme();
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className='w-full h-[65px] relative top-0 shadow-lg px-20 backdrop-blur-md z-50'>
            <div className='w-full h-full flex flex-row items-center justify-between m-auto px-[10px]'>
                <Link href="/" className='h-auto w-auto flex flex-row items-center'>
                    <Image src='/images/logo.png' alt='Logo' width={50} height={50} className='cursor-pointer hover:animate-slowspin' />
                    <Label>
                        <span className='font-bold hover:text-[#FF4D30] ml-[10px] hidden md:block'>
                            Rental Motor Kudus
                        </span>
                    </Label>
                </Link>
                <div className='w-[600px] h-full flex flex-row items-center justify-between md:mr-20 max-sm:text-xs'>
                    <div className='flex items-center justify-between w-full h-auto mr-[15px] px-[20px] py-[10px] font-medium'>
                        <Link href="/" passHref className={activeLink === '/' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/')}>
                            Beranda
                        </Link>
                        <Link href="/list" passHref className={activeLink === '/list' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/list')}>
                            Daftar Motor
                        </Link>
                        <Link href="/about" passHref className={activeLink === '/about' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/about')}>
                            Tentang Kami
                        </Link>
                        <Link href="/terms" passHref className={activeLink === '/terms' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/syarat-dan-ketentuan')}>
                            Syarat dan Ketentuan
                        </Link>
                    </div>
                </div>
                <div className='flex flex-row gap-5 max-sm:w-20 max-sm:gap-1 cursor-pointer'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/login">
                        <Button variant="outline" size="icon">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div >
    )
}