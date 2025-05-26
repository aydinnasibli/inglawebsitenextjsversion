// app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'İngla School | Azərbaycan',
  description: 'İngla School - Təhsil mərkəzi, Preschool, Xaricdə təhsil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az" >
      <body className={`${inter.className} min-h-screen bg-black text-gray-300 `}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}