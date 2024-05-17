import React from 'react';

import NavbarAfter from '@/components/main/NavbarAfter';
import Navbar from '@/components/main/Navbar';
import Footer from '@/components/main/Footer';
import { Label } from '@/components/ui/Label';

export default function Home() {
  return (
    <>
      {/* <NavbarAfter /> */}
      <Navbar />
      <div>
        <Label>Homepage</Label>
      </div>
      <Footer />
    </>
  )
}