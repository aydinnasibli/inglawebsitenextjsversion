import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Əlaqə',
    description: 'Ingla School ilə əlaqə saxlayın. Bakı, Tbilisi prospekti Grand Hayat Residence və Zahid Xəlilov 59a. Tel: 010 310 71 17.',
    alternates: { canonical: '/contact' },
    openGraph: {
        title: 'Əlaqə | Ingla School',
        description: 'Ingla School ilə əlaqə saxlayın. Telefon, e-poçt və ya müraciət formu vasitəsilə.',
        url: 'https://inglaschool.az/contact',
        type: 'website',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
