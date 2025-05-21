// app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'İngla School | Azerbaijan',
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
        {/* Your footer will go here */}
      </body>
    </html>
  );
}