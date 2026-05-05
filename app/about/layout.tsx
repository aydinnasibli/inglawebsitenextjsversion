import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Haqqımızda',
    description: 'Ingla School haqqında — 13 illik təcrübə, 500+ məzun tələbə, 50+ təcrübəli müəllim. Bakıda keyfiyyətli dil təhsilinin öncülü.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'Haqqımızda | Ingla School',
        description: 'Ingla School haqqında — 13 illik təcrübə, 500+ məzun tələbə, 50+ təcrübəli müəllim.',
        url: 'https://inglaschool.az/about',
        type: 'website',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
