// layout.tsx
'use client';

import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/ui/themes";
import './globals.css';
import Navbar from '../components/main/NavbarAfter';

const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
      </body>
    </html>
  );
}
