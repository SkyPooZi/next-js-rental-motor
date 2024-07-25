"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IoIosArrowDown } from "react-icons/io";
import { IoSettings, IoReorderThreeOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';

export default function Navbar() {
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <header className="bg-white shadow-lg">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-1.5 cursor-pointer">
                            <Image src='/images/logo.png' alt='Logo' width='38' height='38' />
                            <Label>
                                <span className='font-bold hidden md:block'>
                                    Rental Motor Kudus
                                </span>
                            </Label>
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/" className={activeLink === '/' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/')}>Beranda</Link>
                        <Link href="/catalog" className={activeLink === '/catalog' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/catalog')}>Daftar Motor</Link>
                        <Link href="/about" className={activeLink === '/about' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/about')}>Tentang Kami</Link>
                        <Link href="/terms" className={activeLink === '/terms' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/terms')}>Syarat & Ketentuan</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Label>
                                        <span className='font-bold hidden md:block'>Hai, User</span>
                                    </Label>
                                    <IoIosArrowDown />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href="/settings?tab=profile" className='flex items-center gap-2 hover:text-[#FF4D30] cursor-pointer'>
                                        <IoSettings size='25' />
                                        <Label>
                                            <span className='font-bold'>Settings</span>
                                        </Label>
                                    </Link>
                                </DropdownMenuItem>
                                <div className="border-t border-[#FF4D30] my-2"></div>
                                <DropdownMenuItem>
                                    <Link href="/login" className='flex items-center gap-2 text-[#FF4D30] cursor-pointer'>
                                        <RiLogoutCircleLine size="25" />
                                        <Label>
                                            <span className='font-bold'>Keluar</span>
                                        </Label>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Sheet>
                            <SheetTrigger>
                                <div className='block lg:hidden border border-white p-2 rounded-md'>
                                    <IoReorderThreeOutline size='25' />
                                </div>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        <div className='flex flex-col items-center gap-8 text-xs sm:text-sm'>
                                            <Link href="/" className={activeLink === '/' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/')}>Beranda</Link>
                                            <Link href="/catalog" className={activeLink === '/catalog' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/catalog')}>Daftar Motor</Link>
                                            <Link href="/about" className={activeLink === '/about' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/about')}>Tentang Kami</Link>
                                            <Link href="/terms" className={activeLink === '/terms' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/terms')}>Syarat & Ketentuan</Link>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
