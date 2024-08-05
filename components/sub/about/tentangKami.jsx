"use client";

import React from 'react';
import Image from 'next/image';

export default function TentangKami() {

    return (
        <div className="flex flex-col items-center bg-[#F6F7F9]">
            <div className="mx-view-pc mt-10 mb-10 flex flex-row">
                <div className="w-1/2">
                    <div className="mb-3">
                        <h1 className="text-black text-xl font-bold mb-6">Tentang Kami</h1>
                        <p className="text-black text-base font-medium text-justify">Selamat datang di layanan sewa motor terpercaya di Kudus! Kami adalah solusi transportasi andalan Anda, menyediakan akses mudah dan nyaman ke berbagai destinasi di sekitar Kudus. Dengan komitmen kami untuk memberikan layanan terbaik, kami bangga menjadi mitra perjalanan pilihan bagi masyarakat lokal dan wisatawan.</p>
                    </div>
                    <div className='mt-3'>
                        <h1 className="text-black text-xl font-bold mb-6">Layanan Kami</h1>
                        <p className="text-black text-base font-medium text-justify">Kami menyediakan berbagai pilihan motor berkualitas tinggi untuk memenuhi kebutuhan perjalanan Anda. Dengan tarif yang kompetitif dan proses penyewaan yang sederhana, kami memastikan pengalaman menyewa motor anda menjadi lancar dan menyenangkan. Kami juga menawarkan berbagai paket sewa harian, mingguan, dan bulanan yang dapat disesuaikan dengan kebutuhan anda.</p>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <Image src='/images/vespa.png' alt='motor' width={500} height={500} />
                </div>
            </div>
        </div>
    );
}