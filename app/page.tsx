import { Suspense } from 'react';
import HomeClient from "@/components/HomeClient";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_CAROUSEL_QUERY } from "@/sanity/lib/queries";
import { SanityCarouselItem } from "@/types/carousel";

async function getCarouselData(): Promise<SanityCarouselItem[]> {
  try {
    const data = await client.fetch<SanityCarouselItem[]>(
      HOMEPAGE_CAROUSEL_QUERY,
      {},
      {
        cache: 'force-cache',
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return [];
  }
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-gray-300">Yüklənir...</p>
      </div>
    </div>
  );
}

export default async function Home() {
  const carouselData = await getCarouselData();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeClient initialCarouselData={carouselData} />
    </Suspense>
  );
}

// Add metadata
export const metadata = {
  title: 'İngla School - Dünya Səviyyəsində Təhsil',
  description: 'Beynəlxalq standartlara uyğun təhsil proqramları və müasir tədris metodları ilə gələcəyinizi formalaşdırın.',
};