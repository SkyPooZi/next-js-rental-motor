'use client';

import Navbar from '@/components/sub/main/NavbarAfter';
import TentangKami from '@/components/sub/about/tentangKami';
import MengapaMemilihKami from '@/components/sub/about/mengapaMemilihKami';
import KeunggulanKami from '@/components/sub/about/keunggulanKami';
import Lokasi from '@/components/sub/about/Lokasi';
import Footer from '@/components/sub/main/Footer';

export default function About() {

    return (
        <>
            <Navbar />
            <TentangKami />
            <KeunggulanKami />
            <MengapaMemilihKami />
            <Lokasi />
            <Footer />
        </>
    );
}
