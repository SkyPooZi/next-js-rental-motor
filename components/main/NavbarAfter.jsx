'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { IoIosArrowDown } from "react-icons/io";
import { IoSettings, IoReorderThreeOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';

export default function Navbar() {
    const [activeLink, setActiveLink] = useState('/');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get('token');
            const id = Cookies.get('id');
            if (token) {
                setIsLoggedIn(true);
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log('Fetched user data:', data);
                    const user = data.user;
                    const role = user.peran;
                    Cookies.set('role', role)

                    setUser(data.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUser();
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        Cookies.remove('token');
        Cookies.remove('id');
        Cookies.remove('role');
        Cookies.remove('email');
        router.push('/login');
    };

    return (
        <header className="bg-white shadow-lg">
            <div className="lg:mx-view-pc">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-1.5 ml-5 lg:ml-0 cursor-pointer">
                            <Image src='/images/logo.png' alt='Logo' width='38' height='38' />
                            <Label>
                                <span className='font-bold hidden md:block'>Rental Motor Kudus</span>
                            </Label>
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/" className={activeLink === '/' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/')}>Beranda</Link>
                        <Link href="/catalog" className={activeLink === '/catalog' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/catalog')}>Daftar Motor</Link>
                        <Link href="/about" className={activeLink === '/about' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/about')}>Tentang Kami</Link>
                        <Link href="/snk" className={activeLink === '/snk' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/snk')}>Syarat & Ketentuan</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <Avatar className="w-10 h-10">
                                            {user?.gambar ? (
                                                <AvatarImage className="w-full h-full object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${user.gambar}`} />
                                            ) : (
                                                <AvatarFallback>o_o</AvatarFallback>
                                            )}
                                        </Avatar>
                                        <Label>
                                            <span className='font-bold hidden md:block'>Hai, {user?.nama_pengguna}</span>
                                        </Label>
                                        <IoIosArrowDown />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link href="/setting" className='flex items-center gap-2 hover:text-[#FF4D30]'>
                                            <IoSettings size='25' />
                                            <span className='font-bold cursor-pointer'>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <div className="border-t border-[#FF4D30] my-2"></div>
                                    <DropdownMenuItem onSelect={handleLogout}>
                                        <div className='flex items-center gap-2 text-[#FF4D30] cursor-pointer'>
                                            <RiLogoutCircleLine size="25" />
                                            <Label>
                                                <span className='font-bold cursor-pointer'>Keluar</span>
                                            </Label>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="px-4 py-2 text-white bg-[#FF4D30] rounded"
                            >
                                Login
                            </button>
                        )}
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
                                            <Link href="/snk" className={activeLink === '/snk' ? 'text-[#FF4D30]' : 'text-gray-700 hover:text-[#FF4D30]'} onClick={() => handleLinkClick('/snk')}>Syarat & Ketentuan</Link>
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