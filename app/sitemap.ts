import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import {
    postSlugsQuery,
    SERVICE_SLUGS_QUERY,
    COUNTRY_SLUGS_QUERY,
    PRESCHOOL_SLUGS_QUERY,
    trainingQueries,
} from '@/sanity/lib/queries'

const BASE_URL = 'https://inglaschool.az'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL,                           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
        { url: `${BASE_URL}/services`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
        { url: `${BASE_URL}/studyabroad`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
        { url: `${BASE_URL}/preschool`,            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/training-center`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/blog`,                 lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
        { url: `${BASE_URL}/about`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/contact`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ]

    const [blogSlugs, services, countries, preschoolItems, trainings] = await Promise.allSettled([
        client.fetch<string[]>(postSlugsQuery),
        client.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY),
        client.fetch<{ slug: string }[]>(COUNTRY_SLUGS_QUERY),
        client.fetch<{ slug: string }[]>(PRESCHOOL_SLUGS_QUERY),
        client.fetch<{ slug: string }[]>(trainingQueries.slugs),
    ])

    const blogPages: MetadataRoute.Sitemap =
        blogSlugs.status === 'fulfilled'
            ? (blogSlugs.value || []).map((slug) => ({
                url: `${BASE_URL}/blog/${slug}`,
                lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6,
            }))
            : []

    const servicePages: MetadataRoute.Sitemap =
        services.status === 'fulfilled'
            ? (services.value || []).map(({ slug }) => ({
                url: `${BASE_URL}/services/${slug}`,
                lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7,
            }))
            : []

    const countryPages: MetadataRoute.Sitemap =
        countries.status === 'fulfilled'
            ? (countries.value || []).map(({ slug }) => ({
                url: `${BASE_URL}/studyabroad/${slug}`,
                lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7,
            }))
            : []

    const preschoolPages: MetadataRoute.Sitemap =
        preschoolItems.status === 'fulfilled'
            ? (preschoolItems.value || []).map(({ slug }) => ({
                url: `${BASE_URL}/preschool/${slug}`,
                lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6,
            }))
            : []

    const trainingPages: MetadataRoute.Sitemap =
        trainings.status === 'fulfilled'
            ? (trainings.value || []).map(({ slug }) => ({
                url: `${BASE_URL}/training-center/${slug}`,
                lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6,
            }))
            : []

    return [...staticPages, ...blogPages, ...servicePages, ...countryPages, ...preschoolPages, ...trainingPages]
}
