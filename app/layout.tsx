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
  metadataBase: new URL('https://inglaschool.az'),
  title: {
    default: "Ingla School | Azərbaycan",
    template: "%s | Ingla School",
  },
  description: "Ingla School — Bakıda beynəlxalq standartlarda dil kursları, preschool, xaricdə təhsil və peşəkar təlim mərkəzi. Uşaqlardan yetkinlərə qədər keyfiyyətli təhsil həlləri.",
  keywords: [
    "ingla school", "dil kursu baku", "ingilis dili kursu", "xaricdə təhsil",
    "preschool baku", "təlim mərkəzi", "IELTS hazırlıq", "SAT hazırlıq",
    "Bakı dil kursu", "ingla school baku", "azerbaycan dil kursu"
  ],
  authors: [{ name: "Ingla School" }],
  creator: "Ingla School",
  publisher: "Ingla School",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: "https://inglaschool.az",
    siteName: "Ingla School",
    title: "Ingla School | Azərbaycan",
    description: "Bakıda beynəlxalq standartlarda dil kursları, preschool, xaricdə təhsil və peşəkar təlim mərkəzi.",
    images: [{ url: "/assets/logoingla.png", width: 800, height: 600, alt: "Ingla School" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingla School | Azərbaycan",
    description: "Bakıda beynəlxalq standartlarda dil kursları, preschool, xaricdə təhsil və peşəkar təlim mərkəzi.",
    images: ["/assets/logoingla.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
  },
  verification: {
    google: "",
  },
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
