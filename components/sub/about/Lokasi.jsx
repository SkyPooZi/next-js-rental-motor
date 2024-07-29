"use client";

import React from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { IoLocationSharp, IoMapSharp } from "react-icons/io5";

export default function Lokasi() {

    return (
        <div className="bg-[#F6F7F9] flex flex-col justify-center items-center">
            <div className="mx-view-pc">
                <div className='mt-10 mb-6'>
                    <p className="text-black text-2xl font-bold text-center">Lokasi Kami</p>
                </div>
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.872378039436!2d110.89978167475574!3d-6.785381493211696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70db4255192741%3A0x6e1d151b0d52676c!2sSewa%20Motor%20Kudus!5e0!3m2!1sid!2sid!4v1722223502208!5m2!1sid!2sid"
                        width="1200"
                        height="500"
                        allowFullScreen=""
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <Label>
                    <div className='flex flex-row gap-1 items-center mt-4 mb-10'>
                        <IoLocationSharp size='30' color='red' />
                        <Link href="https://maps.app.goo.gl/xFp83TkWAVgps3No7" target='_blank'>
                            <span className='font-semibold text-[#0194F3] text-base hover:underline'>
                                Trengguluh, Honggosoco, Kec. Jekulo, Kabupaten Kudus, Jawa Tengah
                            </span>
                        </Link>
                    </div>
                </Label>
            </div>
        </div>
    );
}