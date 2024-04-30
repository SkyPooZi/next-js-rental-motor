"use client";

import React from 'react'
import Link from 'next/link';

import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import ReactWhatsapp from 'react-whatsapp';

import { Label } from '@/components/ui/label';

export default function Footer() {
    return (
        <div className='flex flex-row px-40 py-8 gap-36 justify-center'>
            <div className='flex flex-col gap-3'>
                <Label>
                    <span className='font-bold text-base'>
                        Tetap Terhubung
                    </span>
                </Label>
                <div className='flex flex-row gap-3'>
                    <FaFacebook color='#878787' size='25' />
                    <a target='_blank' href='https://www.instagram.com/zein_wx'>
                        <FaInstagram color='#878787' size='25' />
                    </a>
                </div>
                <div className='flex flex-row gap-1'>
                    <Label>
                        Pertanyaan? hubungi kami melalui :
                    </Label>
                    <Label>
                        <a href="mailto:rentalmotorkudus@gmail.com">
                            <span className='font-bold underline'>
                                rentalmotorkudus@gmail.com
                            </span>
                        </a>
                    </Label>
                </div>
                <div className='flex flex-row gap-1'>
                    <Label>
                        Hubungi customer service kami :
                    </Label>
                    <a href="">
                        <Label>
                            <span className='font-bold'>
                                <ReactWhatsapp number="+62-858-7812-3310" message="" className="flex items-center font-semibold text-[#29A71A]">
                                    <FaWhatsapp color='#29A71A' className="mr-1" /> +62-858-7812-3310
                                </ReactWhatsapp>
                            </span>
                        </Label>
                    </a>
                </div>
                <div className='mt-3'>
                    <Label>
                        <span className='font-bold'>
                            Rental Motor Kudus © 2021. All Rights Reserved.
                        </span>
                    </Label>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <Label>
                    <span className='font-bold text-base'>
                        Info
                    </span>
                </Label>
                <div className='flex flex-row gap-3'>
                    <Label>
                        <Link href="/about">
                            <span className='font-bold underline text-[#878787]'>
                                Tentang Kami
                            </span>
                        </Link>
                    </Label>
                    <Label>
                        <Link href="/terms">
                            <span className='font-bold underline text-[#878787]'>
                                Syarat Rental
                            </span>
                        </Link>
                    </Label>
                </div>
            </div>
        </div>
    );
}