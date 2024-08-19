"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { IoLocationSharp } from "react-icons/io5";
import { motion, useInView } from 'framer-motion';

export default function Lokasi() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    return (
        <div className="relative overflow-hidden bg-gradient-to-tl from-[#F6F7F9] via-[#E9ECF1] to-[#F6F7F9] flex flex-col justify-center items-center p-4 lg:p-8" ref={containerRef}>
            <div className="relative z-10 mx-auto max-w-screen-lg">
                <div className='mt-10 mb-6'>
                    <motion.p
                        className="text-black text-2xl lg:text-3xl font-bold text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                    >
                        Lokasi Kami
                    </motion.p>
                </div>
                <div className="w-full overflow-hidden rounded-lg shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.872378039436!2d110.89978167475574!3d-6.785381493211696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70db4255192741%3A0x6e1d151b0d52676c!2sSewa%20Motor%20Kudus!5e0!3m2!1sid!2sid!4v1722223502208!5m2!1sid!2sid"
                        className="w-full h-64 lg:h-80"
                        allowFullScreen=""
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <Label>
                    <div className='flex flex-row gap-2 items-center mt-4 mb-10'>
                        <IoLocationSharp size='24' color='red' />
                        <Link href="https://maps.app.goo.gl/xFp83TkWAVgps3No7" target='_blank'>
                            <motion.span
                                className='font-semibold text-[#0194F3] text-sm lg:text-base hover:underline'
                                initial={{ y: 10, opacity: 0 }}
                                animate={isInView ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                            >
                                Trengguluh, Honggosoco, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah
                            </motion.span>
                        </Link>
                    </div>
                </Label>
            </div>
        </div>
    );
}