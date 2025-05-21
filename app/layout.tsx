// app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className={inter.className}>
        {/* Header will be added by you */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">{children}</main>
          {/* Footer will be added by you */}
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'İngla School | Azərbaycanda Keyfiyyətli Təhsil',
  description: 'İngla School - Azərbaycanda müasir təhsil və xaricdə təhsil imkanları təqdim edən aparıcı təhsil mərkəzi',
};