"use client";

import { Poppins } from 'next/font/google'

import NavbarAfter from '../components/main/NavbarAfter';
import Footer from '@/components/main/Footer2';
import { ThemeProvider } from "@/components/ui/themes";
import './globals.css'
import Navbar from '@/components/main/Navbar';
import { SessionProvider } from 'next-auth/react';
import { metadata } from './metadata';

const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <NavbarAfter /> */}
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
