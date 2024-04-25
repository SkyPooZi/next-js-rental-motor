import { Poppins } from 'next/font/google'

import NavbarAfter from '../components/main/NavbarAfter';
import Footer from '@/components/main/Footer';
import { ThemeProvider } from "@/components/ui/themes";
import './globals.css'

const poppins = Poppins({
  weight: ['400'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Rental Motor Kudus',
  description: 'Website Rental Motor Kudus',
}

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
          <NavbarAfter />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
