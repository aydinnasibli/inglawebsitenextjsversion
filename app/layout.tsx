import React from "react";
import { Lexend } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";

const lexend = Lexend({
  subsets: ["latin"],
  variable: '--font-lexend',
});

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${lexend.variable} ${lexend.className} min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col`}
      >
        <GoogleAnalytics gaId="G-4680L6LTVN" />
        <Navbar />
        <main className="grow flex flex-col">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
