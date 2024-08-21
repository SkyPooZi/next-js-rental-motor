"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TentangKami() {
    return (
        <div className="relative flex flex-col items-center bg-gradient-to-r from-[#FF4D30] via-[#FF6A5C] to-[#FF4D30] text-white overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30">
                <Image src="/images/motor.jpg" alt="background" layout="fill" objectFit="cover" className="w-full h-full" />
            </div>

            <div className="relative mx-4 md:mx-8 lg:mx-view-pc mt-16 mb-16 flex flex-col lg:flex-row items-center z-10">
                <div className="w-full lg:w-1/2 flex justify-center relative mb-10 lg:mb-0">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute bg-[#FF4D30] rounded-full w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] -left-10 -top-10 lg:-left-20 lg:-top-20 z-0"></div>
                        <Image src='/images/vespa.png' alt='motor' width={600} height={400} className="relative z-10 max-w-full h-auto" />
                    </motion.div>
                </div>

                <div className="w-full lg:w-1/2 px-4 lg:pl-8">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">TENTANG KAMI</h1>
                        <p className="text-base md:text-lg font-medium text-justify mb-4 md:mb-6">
                            Selamat datang di layanan sewa motor terpercaya di Kudus! Kami adalah solusi transportasi andalan Anda, menyediakan akses mudah dan nyaman ke berbagai destinasi di sekitar Kudus. Dengan komitmen kami untuk memberikan layanan terbaik, kami bangga menjadi mitra perjalanan pilihan bagi masyarakat lokal dan wisatawan.
                        </p>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">LAYANAN KAMI</h1>
                        <p className="text-base md:text-lg font-medium text-justify mb-4 md:mb-6">
                            Kami menyediakan berbagai pilihan motor berkualitas tinggi untuk memenuhi kebutuhan perjalanan Anda. Dengan tarif yang kompetitif dan proses penyewaan yang sederhana, kami memastikan pengalaman menyewa motor Anda menjadi lancar dan menyenangkan. Kami juga menawarkan berbagai paket sewa harian, mingguan, dan bulanan yang dapat disesuaikan dengan kebutuhan Anda.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
