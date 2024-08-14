import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TO DO',
  description: 'TO DO List with Next.js - LocalStorage',
};

export default function RootLayout({ children }) {
  return (
    <html lang='pt-br'>
      <body className={inter.className} data-theme='emerald'>{children}</body>
    </html>
  );
}
