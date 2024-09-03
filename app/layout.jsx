// layout.tsx
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/ui/themes";
import './globals.css';
import Navbar from '../components/sub/main/NavbarAfter';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Rental Motor Kudus',
  description: 'Rental Motor Terpercaya di Kudus. Kami menyediakan berbagai jenis motor dengan harga terjangkau.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
