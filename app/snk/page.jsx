'use client';

import React from 'react';
import Snk from '@/components/sub/syaratDanKetentuan/syaratDanKetentuan';
import Navbar from '@/components/sub/main/NavbarAfter';
import Footer from '@/components/sub/main/Footer';

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
