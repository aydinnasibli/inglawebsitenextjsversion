import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem } from "@/types/services";
import ServicesPage from "./ServicesClient";

export const revalidate = 60;

export default async function ServicesPageRoute() {
    const services = await client.fetch<SanityServiceItem[]>(SERVICES_QUERY);
    return <ServicesPage initialServicesData={services ?? []} />;
}
