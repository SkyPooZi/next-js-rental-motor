"use client";

import React from 'react';
import Image from 'next/image';

export default function KeunggulanKami() {
    return (
        <div className="bg-[#F6F7F9]">
            <div className='mx-view-pc'>
                <div className='mb-6'>
                    <p className="text-black text-2xl font-bold text-center">Keunggulan Kami</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    {[
                        { src: '/images/utils/logo1.png', text: 'Kendaraan Terawat' },
                        { src: '/images/utils/logo2.png', text: '24/7 Customer Service' },
                        { src: '/images/utils/logo3.png', text: 'Harga Pas' },
                        { src: '/images/utils/logo4.png', text: 'Kemudahan Pembayaran' },
                        { src: '/images/utils/logo5.png', text: 'Layanan Antar Jemput Kendaraan' },
                        { src: '/images/utils/logo6.png', text: 'Pemantauan GPS untuk keamanan' }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center w-1/6">
                            <div className="w-30 h-30 flex items-center justify-center">
                                <Image src={item.src} alt={`Logo ${index + 1}`} width={150} height={150} />
                            </div>
                            <p className="text-black text-base font-medium text-center mt-2 mb-10">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
