'use client';

import React from 'react';
import SyaratDanKetentuan from '@/components/sub/syaratDanKetentuan/syaratDanKetentuan';
import Navbar from '@/components/main/Navbar';
import Footer from '@/components/main/Footer';

export default function SyaratKetentuan() {

    return (
        <>
            <Navbar/>
            <SyaratDanKetentuan />
            <Footer/>
        </>
    );
}
