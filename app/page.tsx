import HomeClient from "@/components/HomeClient";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_CAROUSEL_QUERY } from "@/sanity/lib/queries";
import { SanityCarouselItem } from "@/types/carousel";

async function getCarouselData(): Promise<SanityCarouselItem[]> {
  try {
    const data = await client.fetch<SanityCarouselItem[]>(HOMEPAGE_CAROUSEL_QUERY);
    return data || [];
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return [];
  }
}

export default async function Home() {
  const carouselData = await getCarouselData();

  return <HomeClient initialCarouselData={carouselData} />;
}