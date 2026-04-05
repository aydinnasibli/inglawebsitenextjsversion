import { Suspense } from 'react';
import HomeClient from "@/components/HomeClient";
import { client } from "@/sanity/lib/client";
import { FEATURED_SERVICES_QUERY } from "@/sanity/lib/queries";

export interface HomeService {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  featuredImage?: any;
  duration?: string;
  priceRange?: string;
  category?: string;
  isFeatured?: boolean;
}

async function getHomeData(): Promise<HomeService[]> {
  try {
    const data = await client.fetch<HomeService[]>(
      FEATURED_SERVICES_QUERY,
      {},
      { cache: 'force-cache', next: { revalidate: 3600 } }
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching services for homepage:', error);
    return [];
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
  const services = await getHomeData();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeClient initialServicesData={services} />
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
