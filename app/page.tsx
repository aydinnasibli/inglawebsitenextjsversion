import { Suspense } from 'react';
import HomeClient from "@/components/HomeClient";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_BENTO_QUERY } from "@/sanity/lib/queries";
import { BentoItem } from "@/components/BentoBox";

async function getBentoData(): Promise<BentoItem[]> {
  try {
    const data = await client.fetch<BentoItem[]>(
      HOMEPAGE_BENTO_QUERY,
      {},
      {
        cache: 'force-cache',
        next: { revalidate: 3600 }
      }
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching bento data:', error);
    return [];
  }
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-slate-500">Yüklənir...</p>
      </div>
    </div>
  );
}

export default async function Home() {
  const bentoData = await getBentoData();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeClient initialBentoData={bentoData} />
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
