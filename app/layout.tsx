// app/layout.tsx
import React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ingla School | Azərbaycan",
  description: "Ingla School - Təhsil mərkəzi, Preschool, Xaricdə təhsil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body
        className={`${inter.className} min-h-screen bg-black text-gray-300 `}
      >
        <GoogleAnalytics gaId="G-4680L6LTVN" />
        <Navbar />
        <main className="grow">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
