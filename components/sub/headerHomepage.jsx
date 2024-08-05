'use client';

import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@material-tailwind/react';
import '../../styles/slideInAnimation.css';

export default function HeaderHomePage() {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <div>
            <main>
                <div className='flex justify-center md:justify-between'>
                    <div className={`flex flex-col mt-6 w-fit ${hasMounted ? 'slide-in delay-1' : ''}`}>
                        <div className='flex flex-col'>
                            <h1 className="text-3xl md:text-5xl font-bold text-black">
                                Jelajahi & <span className="text-[#FF4D30]">Temukan</span>
                            </h1>
                            <h1 className="text-3xl mt-2 md:text-5xl font-bold text-black">
                                <span className="text-[#FF4D30]">Motor</span> Anda
                            </h1>
                        </div>
                        <p className="text-base mt-4 text-black">
                            Sewa Motor dengan Mudah,<br />
                            Rasakan Kemudahan Tanpa Batas!
                        </p>
                        <Link href='/catalog' className='my-5 ml-1'>
                            <Button className="before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
                                <span className="relative text-base z-10">Pesan Sekarang!</span>
                            </Button>
                        </Link>
                        {/* <div className='flex flex-col md:flex-row gap-1 md:gap-3'>
                        <Link href='/catalog' className='mt-5'>
                            <Button className="before:ease bg-[#FF4D33] border-2 border-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-2 hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
                                <span className="relative text-base z-10">Pesan Sekarang!</span>
                            </Button>
                        </Link>
                        <Link href='#' className='mt-2 md:mt-5 mb-5'>
                            <Button className="before:ease bg-white text-[#FF4D33] capitalize relative overflow-hidden shadow-[#FF4D33] border-2 border-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#FF4D33] before:duration-300 hover:text-white hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32">
                                <span className="relative text-base z-10">Lihat Motor</span>
                            </Button>
                        </Link>
                    </div> */}
                    </div>
                    <div className={`hidden xl:flex absolute right-0 top-28 w-[660px] ${hasMounted ? 'slide-in-right delay-1' : ''}`}>
                        <Image
                            src="/images/backgroundScooter.png"
                            alt="Motorbike Background"
                            className='absolute top-0 right-0 w-[660px] object-cover rounded-lg'
                            width={1000}
                            height={1000}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
