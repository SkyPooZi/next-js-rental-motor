"use client";

import React from 'react';
import Image from 'next/image';
import ContactButton from '@/components/ui/ContactButton';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MengapaMemilihKami() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FF4D30] via-[#FF6A5C] to-[#FF4D30] py-8 lg:py-16" ref={containerRef}>
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute top-10 right-20 w-20 h-20 lg:w-40 lg:h-40 bg-white opacity-30 rounded-full"
                    animate={isInView ? { x: [0, 30, -30, 0], y: [0, 30, -30, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 10 }}
                />
                <motion.div
                    className="absolute bottom-10 left-5 w-28 h-28 lg:w-56 lg:h-56 bg-yellow-500 opacity-20 rounded-full"
                    animate={isInView ? { x: [0, -40, 40, 0], y: [0, -40, 40, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 12 }}
                />
                <motion.div
                    className="absolute top-32 left-1/2 transform -translate-x-1/2 w-16 h-16 lg:w-32 lg:h-32 bg-pink-500 opacity-25 rounded-full"
                    animate={isInView ? { x: [0, 20, -20, 0], y: [0, 20, -20, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 15 }}
                />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:mx-view-pc mx-4">
                {/* Image Section */}
                <motion.div
                    className='mb-8 lg:mb-0 lg:mr-20 flex justify-center lg:justify-start'
                    initial={{ x: -100, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <Image src='/images/orang.png' alt='Gambar Orang' className='py-12 lg:pl-8' width={500} height={300} />
                </motion.div>

                {/* Text and Buttons Section */}
                <div className='flex flex-col'>
                    <motion.div
                        className='mb-4 text-center lg:text-left'
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="text-white text-2xl lg:text-3xl font-bold mb-4">MENGAPA MEMILIH KAMI?</h1>
                    </motion.div>

                    <motion.div
                        className='mb-2 text-center lg:text-left'
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <p className='text-white text-base lg:text-lg font-medium'>
                            Kami menghargai kepercayaan Anda dalam memilih layanan sewa motor kami. Dengan fokus pada kepuasan pelanggan, kami berusaha untuk memberikan pengalaman perjalanan yang tak terlupakan. Jadilah bagian dari komunitas kami dan rasakan kebebasan berkendara dengan layanan sewa motor terbaik di Kudus.
                        </p>
                    </motion.div>

                    <motion.div
                        className='mt-2 mb-6 text-center lg:text-left'
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.9 }}
                    >
                        <p className='text-white text-base lg:text-lg font-medium'>
                            Hubungi kami sekarang untuk informasi lebih lanjut atau lakukan pemesanan online. Terima kasih atas kepercayaan Anda kepada kami sebagai mitra perjalanan Anda di Kudus!
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col lg:flex-row lg:justify-start sm:justify-center items-center w-full"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <ContactButton />
                        <Link href={`/catalog`}>
                            <Button className="lg:ml-5 lg:mt-0 mt-5 bg-[#FF4D33] border-2 border-white capitalize relative overflow-hidden shadow-[#FF4D33] transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-white before:duration-300 hover:text-[#FF4D33] hover:border-[#FF4D33] hover:shadow-[#FF4D33] hover:before:h-64 hover:before:-translate-y-32 text-white py-2 px-4 rounded-full text-base lg:text-base md:text-sm w-auto">
                                <span className="relative z-10">Lihat Pilihan Motor</span>
                            </Button>
                        </Link>
                    </motion.div>


                </div>
            </div>
        </div>
    );
}
