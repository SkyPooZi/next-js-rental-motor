"use client";

import { React, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IoIosArrowDown } from "react-icons/io";
import { IoSettings, IoReorderThreeOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

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
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from '@/components/ui/label';

export default function Navbar() {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <>
            <header className="bg-white shadow-lg">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <a className="flex items-center gap-1.5 text-[#FF4D33]" href="/">
                                <Image src='/images/logo.png' alt='Logo' width='38' height='38' className='cursor-pointer md:w-auto' />
                                <Label>
                                    <span className='font-bold hidden md:block'>
                                        Rental Motor Kudus
                                    </span>
                                </Label>
                            </a>
                        </div>
                        <div className="hidden lg:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <a href="/" passHref className={activeLink === '/' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/')}> Beranda </a>
                                    </li>
                                    <li>
                                        <a href="/list" passHref className={activeLink === '/list' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/list')}> Daftar Motor </a>
                                    </li>
                                    <li>
                                        <a href="/about" passHref className={activeLink === '/about' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/about')}> Tentang Kami </a>
                                    </li>
                                    <li>
                                        <a href="/terms" passHref className={activeLink === '/terms' ? 'text-[#FF4D30] cursor-pointer hover:text-[#FF4D30]' : 'cursor-pointer hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/syarat-dan-ketentuan')}> Syarat & Ketentuan </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
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
                                                        <span className='font-bold ml-[10px] cursor-pointer'>
                                                            Settings
                                                        </span>
                                                    </Label>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                        <div className="border-t border-[#FF4D30] m-2"></div>
                                        <DropdownMenuItem>
                                            <Link href="/logout">
                                                <div className='flex flex-row justify-center items-center text-[#FF4D30]'>
                                                    <RiLogoutCircleLine size="25" />
                                                    <Label>
                                                        <span className='font-bold ml-[10px]'>
                                                            Keluar
                                                        </span>
                                                    </Label>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <Sheet>
                                <div className='block lg:hidden'>
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
                </div>
            </header>
        </>
    )
}