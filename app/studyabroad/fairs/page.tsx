import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { FAIRS_QUERY } from '@/sanity/lib/queries';
import { SanityFair } from '@/types/study-abroad';
import FairsSection from '@/components/FairsSection';

export const metadata: Metadata = {
    title: 'Universitetlər Sərgiləri | Ingla School',
    description: 'Xarici universitetlərin nümayəndələri ilə birbaşa görüşün. Sərgi təqvimini izləyin.',
    openGraph: {
        title: 'Universitetlər Sərgiləri | Ingla School',
        description: 'Xarici universitetlərin nümayəndələri ilə birbaşa görüşün.',
        type: 'website',
        locale: 'az_AZ',
    },
};

export default async function FairsPage() {
    let fairs: SanityFair[] = [];
    try {
        fairs = await client.fetch<SanityFair[]>(
            FAIRS_QUERY,
            {},
            { cache: 'force-cache', next: { revalidate: 3600 } }
        );
    } catch (error) {
        console.error('Error fetching fairs:', error);
    }

    return (
        <div className="flex-1 bg-background-light dark:bg-background-dark">
            {/* Header */}
            <div className="relative overflow-hidden bg-slate-900 dark:bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd90008_1px,transparent_1px),linear-gradient(to_bottom,#ffd90008_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6 flex-wrap">
                        <Link href="/" className="hover:text-primary transition-colors">Ana Səhifə</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/studyabroad" className="hover:text-primary transition-colors">Xaricdə Təhsil</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-primary">Sərgilər</span>
                    </div>
                    <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                        Universitetlər Sərgiləri
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mt-4 max-w-2xl">
                        Xarici universitetlərin nümayəndələri ilə birbaşa görüşün, suallarınıza cavab alın və proqramlar haqqında ətraflı məlumat əldə edin.
                    </p>
                </div>
            </div>

            {/* All fairs — reuse the same section component, it shows all */}
            {fairs.length > 0 ? (
                <FairsSection fairs={fairs} />
            ) : (
                <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 text-center">
                    <p className="text-slate-400 text-lg">Hal-hazırda planlaşdırılmış sərgi yoxdur.</p>
                    <Link
                        href="/studyabroad"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                    >
                        Xaricdə Təhsilə qayıt <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </div>
    );
}
