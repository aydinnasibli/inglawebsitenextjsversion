import { Suspense } from 'react';
import HomeClient from "@/components/HomeClient";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOMEPAGE_BENTO_QUERY, BENTO_CATEGORY_IMAGES_QUERY, HOMEPAGE_NEWS_QUERY } from "@/sanity/lib/queries";
import { BentoItem } from "@/components/BentoBox";
import { HomepageNewsData } from "@/types/news";

type CategoryImages = {
    services?:    { img?: any } | null;
    studyabroad?: { img?: any } | null;
    preschool?:   { img?: any } | null;
    training?:    { img?: any } | null;
};

function resolveImg(ref?: any): string | null {
    if (!ref) return null;
    try { return urlFor(ref).width(900).height(700).quality(85).url(); } catch { return null; }
}

function buildBentoFromImages(imgs: CategoryImages): BentoItem[] {
    return [
        {
            _id: "b-services",
            title: "Dil Kursları & IELTS",
            description: "Başlanğıcdan C1-ə qədər intensiv dil proqramları və sınaq hazırlığı.",
            icon: "language",
            image: resolveImg(imgs.services?.img) ?? undefined,
            link: "/services",
            linkLabel: "Proqramlara bax",
            size: "large",
            variant: "dark",
            order: 1,
        },
        {
            _id: "b-studyabroad",
            title: "Xaricdə Təhsil",
            description: "50+ aparıcı universitetə qəbul, viza dəstəyi və tam müşayiət.",
            icon: "public",
            image: resolveImg(imgs.studyabroad?.img) ?? undefined,
            link: "/studyabroad",
            linkLabel: "Ölkələrə bax",
            size: "tall",
            variant: "dark",
            order: 2,
        },
        {
            _id: "b-preschool",
            title: "Preschool",
            description: "3–6 yaş uşaqlar üçün oyun əsaslı erkən inkişaf.",
            icon: "child_care",
            image: resolveImg(imgs.preschool?.img) ?? undefined,
            link: "/preschool",
            linkLabel: "Ətraflı",
            size: "small",
            variant: "primary",
            order: 3,
        },
        {
            _id: "b-training",
            title: "Təlim Mərkəzi",
            description: "Peşəkar sertifikat proqramları.",
            icon: "workspace_premium",
            image: resolveImg(imgs.training?.img) ?? undefined,
            link: "/training-center",
            linkLabel: "Bax",
            size: "small",
            variant: "dark",
            order: 4,
        },
    ];
}

async function getBentoData(): Promise<BentoItem[]> {
    try {
        const cmsBento = await client.fetch<BentoItem[]>(
            HOMEPAGE_BENTO_QUERY,
            {},
            { cache: 'force-cache', next: { revalidate: 3600 } }
        );
        if (Array.isArray(cmsBento) && cmsBento.length > 0) return cmsBento;

        const imgs = await client.fetch<CategoryImages>(
            BENTO_CATEGORY_IMAGES_QUERY,
            {},
            { cache: 'force-cache', next: { revalidate: 3600 } }
        );
        return buildBentoFromImages(imgs ?? {});
    } catch (error) {
        console.error('Error fetching bento data:', error);
        return [];
    }
}

async function getNewsData(): Promise<HomepageNewsData> {
    try {
        const data = await client.fetch<HomepageNewsData>(
            HOMEPAGE_NEWS_QUERY,
            {},
            { cache: 'force-cache', next: { revalidate: 1800 } }
        );
        return data ?? { featured: null, latest: [] };
    } catch (error) {
        console.error('Error fetching homepage news:', error);
        return { featured: null, latest: [] };
    }
}

function LoadingFallback() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-slate-500">Yüklənir...</p>
            </div>
        </div>
    );
}

export default async function Home() {
    const [bentoItems, newsData] = await Promise.all([
        getBentoData(),
        getNewsData(),
    ]);

    return (
        <Suspense fallback={<LoadingFallback />}>
            <HomeClient initialBentoData={bentoItems} initialNewsData={newsData} />
        </Suspense>
    );
}

export const metadata = {
    title: 'Ingla School - Dünya Səviyyəsində Təhsil',
    description: 'Beynəlxalq standartlara uyğun dil kursları, preschool, xaricdə təhsil proqramları və peşəkar təlim mərkəzi. Bakıda keyfiyyətli təhsil.',
    openGraph: {
        title: 'Ingla School - Dünya Səviyyəsində Təhsil',
        description: 'Beynəlxalq standartlara uyğun dil kursları, preschool, xaricdə təhsil proqramları.',
        type: 'website',
    },
};
