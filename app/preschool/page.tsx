import { client } from "@/sanity/lib/client";
import { PRESCHOOL_SERVICES_QUERY } from "@/sanity/lib/queries";
import { SanityPreschoolServiceItem } from "@/types/preschool";
import PreschoolClient from "./PreschoolClient";

export const revalidate = 60;

export default async function PreschoolPage() {
    const data = await client.fetch<SanityPreschoolServiceItem[]>(PRESCHOOL_SERVICES_QUERY);
    return <PreschoolClient initialData={data ?? []} />;
}
