'use client';

import React from 'react';
import Snk from '@/components/sub/syaratDanKetentuan/syaratDanKetentuan';
import Navbar from '@/components/main/NavbarAfter';
import Footer from '@/components/main/Footer';

export default function SnkPage() {
    return (
        <>
        <Navbar/>
        <div className='bg-white'>     
            <Snk/>
        </div>
        <Footer/>
        </>
    );
}
