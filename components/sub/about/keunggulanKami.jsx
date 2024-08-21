"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function KeunggulanKami() {
    const hoverEffect = {
        whileHover: { scale: 1.1, rotate: 5, transition: { duration: 0.2, ease: "easeOut" } },
        whileTap: { scale: 0.95 }
    };

    return (
        <div className="bg-gradient-to-t from-white via-gray-100 to-[#F6F7F9] pt-10 pb-16">
            <div className='mx-4 md:mx-8 lg:mx-view-pc'>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1 }}
                    className='mb-10'
                >
                    <p className="text-3xl text-gray-800 font-extrabold text-center drop-shadow-lg">Keunggulan Kami</p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 justify-items-center">
                    {[
                        { src: '/images/utils/logo1.png', text: 'Kendaraan Terawat' },
                        { src: '/images/utils/logo2.png', text: '24/7 Customer Service' },
                        { src: '/images/utils/logo3.png', text: 'Harga Pas' },
                        { src: '/images/utils/logo4.png', text: 'Kemudahan Pembayaran' },
                        { src: '/images/utils/logo5.png', text: 'Layanan Antar Jemput Kendaraan' },
                        { src: '/images/utils/logo6.png', text: 'Pemantauan GPS untuk keamanan' }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.5 }}
                            {...hoverEffect}
                        >
                            <div className="w-30 h-30 flex items-center justify-center">
                                <Image src={item.src} alt={`Logo ${index + 1}`} width={100} height={100} className="drop-shadow-lg rounded-full" />
                            </div>
                            <p className="text-lg text-gray-700 font-medium text-center mt-4 mb-10">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
