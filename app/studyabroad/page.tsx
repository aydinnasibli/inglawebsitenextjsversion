import { Metadata } from 'next';
import StudyAbroadClient from '@/components/StudyAbroadClient';
import { client } from '@/sanity/lib/client';
import { COUNTRIES_QUERY } from '@/sanity/lib/queries';
import { SanityCountry } from '@/types/study-abroad';

export const metadata: Metadata = {
    title: 'Xaricdə Təhsil | İngla School',
    description: 'Dünyanın ən yaxşı universitetlərində təhsil imkanları. Xaricdə təhsil üçün peşəkar məsləhət və tam dəstək.',
    keywords: 'xaricdə təhsil, universitet, beynəlxalq təhsil, təhsil qrantları, study abroad',
    openGraph: {
        title: 'Xaricdə Təhsil | İngla School',
        description: 'Dünyanın ən yaxşı universitetlərində təhsil imkanları',
        type: 'website',
        locale: 'az_AZ',
    },
};

async function getStudyAbroadData() {
    try {
        const [countriesData] = await Promise.all([
            client.fetch<SanityCountry[]>(COUNTRIES_QUERY, {}, {
                cache: 'force-cache',
                next: { revalidate: 3600 } // Revalidate every hour
            }),

        ]);

        return {
            countries: countriesData || [],
        };
    } catch (error) {
        console.error('Error fetching study abroad data:', error);
        return {
            countries: [],
            exhibitions: []
        };
    }
}

export default async function StudyAbroadPage() {
    const { countries } = await getStudyAbroadData();

    return (
        <StudyAbroadClient
            initialCountriesData={countries}
        />
    );
}