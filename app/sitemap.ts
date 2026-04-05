import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { postSlugsQuery, SERVICE_SLUGS_QUERY, COUNTRY_SLUGS_QUERY } from '@/sanity/lib/queries'

const BASE_URL = 'https://inglaschool.az'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/studyabroad`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/preschool`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/training-center`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ]

    // Dynamic blog posts
    let blogPages: MetadataRoute.Sitemap = []
    try {
        const slugs = await client.fetch<string[]>(postSlugsQuery)
        blogPages = (slugs || []).map((slug) => ({
            url: `${BASE_URL}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    } catch (e) {
        console.error('Sitemap: failed to fetch blog slugs', e)
    }

    // Dynamic service pages
    let servicePages: MetadataRoute.Sitemap = []
    try {
        const services = await client.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY)
        servicePages = (services || []).map(({ slug }) => ({
            url: `${BASE_URL}/services/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    } catch (e) {
        console.error('Sitemap: failed to fetch service slugs', e)
    }

    // Dynamic country pages
    let countryPages: MetadataRoute.Sitemap = []
    try {
        const countries = await client.fetch<{ slug: string }[]>(COUNTRY_SLUGS_QUERY)
        countryPages = (countries || []).map(({ slug }) => ({
            url: `${BASE_URL}/studyabroad/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    } catch (e) {
        console.error('Sitemap: failed to fetch country slugs', e)
    }

    return [...staticPages, ...blogPages, ...servicePages, ...countryPages]
}
