"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHistory, AiOutlineDollarCircle } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSettings, IoReorderThreeOutline } from "react-icons/io5";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import Profile from "@/components/sub/profile";
import History from "@/components/sub/history";
import Terms from "@/components/sub/terms";
import Point from "@/components/sub/point";

export default function NavbarAfter() {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className='w-full h-[65px] top-0 shadow-lg px-20 z-50'>
            <div className='w-full h-full flex flex-row items-center justify-between m-auto px-[10px]'>
                <Link href="/" className='flex flex-row items-center md:text-sm'>
                    <Image src='/images/logo.png' alt='Logo' width='25' height='25' className='cursor-pointer  md:w-auto' />
                    <Label>
                        <span className='font-bold hover:text-[#FF4D30] ml-[10px] hidden md:block'>
                            Rental Motor Kudus
                        </span>
                    </Label>
                </Link>
                <div className='w-[600px] h-full flex flex-row items-center justify-between'>
                    <div className='hidden md:flex items-center justify-between w-full mr-[15px] px-[20px] py-[10px] font-medium text-sm'>
                        <Link href="/" passHref className={activeLink === '/' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/')}>
                            Beranda
                        </Link>
                        <Link href="/list" passHref className={activeLink === '/list' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/list')}>
                            Daftar Motor
                        </Link>
                        <Link href="/about" passHref className={activeLink === '/about' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/about')}>
                            Tentang Kami
                        </Link>
                        <Link href="/snk" passHref className={activeLink === '/terms' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/syarat-dan-ketentuan')}>
                            Syarat dan Ketentuan
                        </Link>
                    </div>
                </div>
                <div className='flex flex-row gap-5 max-sm:w-20 max-sm:gap-1 cursor-pointer'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Label>
                                    <span className='font-bold ml-[10px] hidden md:block'>
                                        Hai, User
                                    </span>
                                </Label>
                                <IoIosArrowDown />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href="/settings?tab=profile">
                                    <div className='flex flex-row justify-center items-center hover:text-[#FF4D30] cursor-pointer'>
                                        <IoSettings size='25' />
                                        <Label>
                                            <span className='font-bold ml-[10px] hidden md:block cursor-pointer'>
                                                Settings
                                            </span>
                                        </Label>
                                    </div>
                                </Link>
                                {/* <Link href="/settings?tab=profile">
                                    <div className='flex flex-row justify-center items-center hover:text-[#FF4D30]'>
                                        <CgProfile size="25" />
                                        <Label>
                                            <span className='font-bold ml-[10px] hidden md:block'>
                                                Profil
                                            </span>
                                        </Label>
                                    </div>
                                </Link> */}
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                                <Link href="/settings?tab=history" className='flex flex-row justify-center items-center hover:text-[#FF4D30]'>
                                    <AiOutlineHistory size="25" />
                                    <Label>
                                        <span className='font-bold ml-[10px] hidden md:block'>
                                            Riwayat Penyewaan
                                        </span>
                                    </Label>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/settings?tab=terms" className='flex flex-row justify-center items-center hover:text-[#FF4D30]'>
                                    <FiInfo size="25" />
                                    <Label>
                                        <span className='font-bold ml-[10px] hidden md:block'>
                                            Kebijakan Privasi
                                        </span>
                                    </Label>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/settings?tab=point" className='flex flex-row justify-center items-center hover:text-[#FF4D30]'>
                                    <AiOutlineDollarCircle size='25' />
                                    <Label>
                                        <span className='font-bold ml-[10px] hidden md:block'>
                                            Poin Saya
                                        </span>
                                    </Label>
                                </Link>
                            </DropdownMenuItem> */}
                            <div className="border-t border-[#FF4D30] m-2"></div>
                            <DropdownMenuItem>
                                <Link href="/logout">
                                    <div className='flex flex-row justify-center items-center text-[#FF4D30]'>
                                        <RiLogoutCircleLine size="25" />
                                        <Label>
                                            <span className='font-bold ml-[10px] hidden md:block'>
                                                Keluar
                                            </span>
                                        </Label>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Sheet>
                        <div className='md:hidden'>
                            <SheetTrigger>
                                <div className='border border-white p-2 rounded-md'>
                                    <IoReorderThreeOutline size='25' />
                                </div>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        <div className='flex flex-col w-full h-full pt-36 gap-8 items-center justify-center text-xs sm:text-sm sm:max-w-[500px]'>
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
                                    </SheetTitle>
                                </SheetHeader>
                            </SheetContent>
                        </div>
                    </Sheet>
                </div>
            </div>
        </div >
    );
}