"use client";

import React from 'react';
import Image from 'next/image';
import ContactButton from '@/components/ui/ContactButton';
import Link from 'next/link';

export default function MengapaMemilihKami() {

    return (
        <div className="bg-[#FF4D30]">
            <div className="mx-view-pc flex flex-row items-center">
                <div className='mr-20'>
                    <Image src='/images/utils/orang.png' alt='Gambar Orang' className='py-12 pl-8' width={800} height={500} />
                </div>
                <div className='flex flex-col'>
                    <div className='mb-4'>
                        <h1 className="text-white text-2xl font-bold mb-4">MENGAPA MEMILIH KAMI?</h1>
                    </div>
                    <div className='mb-2'>
                        <p className='text-white text-base font-medium text-justify'>Kami menghargai kepercayaan Anda dalam memilih layanan sewa motor kami. Dengan fokus pada kepuasan pelanggan, kami berusaha untuk memberikan pengalaman perjalanan yang tak terlupakan. Jadilah bagian dari komunitas kami dan rasakan kebebasan berkendara dengan layanan sewa motor terbaik di Kudus.</p>
                    </div>
                    <div className='mt-2 mb-6'>
                        <p className='text-white text-base font-medium text-justify'>Hubungi kami sekarang untuk informasi lebih lanjut atau lakukan pemesanan online. Terima kasih atas kepercayaan Anda kepada kami sebagai mitra perjalanan Anda di Kudus!</p>
                    </div>
                    <div className="flex flex-row">
                        <ContactButton />
                        <Link href={`/catalog`}>
                            <button className="border border-white text-white py-2 px-4 rounded-full ml-4">Lihat Pilihan Motor</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}