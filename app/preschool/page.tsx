import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PRESCHOOL_SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityPreschoolServiceItem } from "@/types/preschool";
import PreschoolClient from "./PreschoolClient";

export const metadata: Metadata = {
    title: "Preschool",
    description: "Ingla Preschool — 2–6 yaş uşaqlar üçün oyun əsaslı öyrənmə, ingilis dili və yaradıcı inkişaf proqramları. Bakıda ən yaxşı preschool.",
    keywords: "preschool baku, uşaq bağçası, erkən inkişaf, ingilis dili uşaqlar, 2-6 yaş, ingla preschool",
};

export const revalidate = 60;

export default async function PreschoolPage() {
    const data = await client.fetch<SanityPreschoolServiceItem[]>(PRESCHOOL_SERVICES_QUERY);
    return <PreschoolClient initialData={data ?? []} />;
}
