import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityServiceItem } from "@/types/services";
import ServicesPage from "./ServicesClient";

export const metadata: Metadata = {
    title: "Tədris İstiqamətləri",
    description: "Ingla School-da mövcud bütün tədris istiqamətləri: dil kursları, IELTS, SAT, preschool, korporativ həllər və daha çox.",
    keywords: "dil kursu, IELTS hazırlıq, SAT, preschool, korporativ təlim, tədris proqramları",
};

export const revalidate = 60;

export default async function ServicesPageRoute() {
    const services = await client.fetch<SanityServiceItem[]>(SERVICES_QUERY);
    return <ServicesPage initialServicesData={services ?? []} />;
}
