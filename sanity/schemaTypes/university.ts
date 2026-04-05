import { defineField, defineType } from 'sanity'

export const university = defineType({
    name: 'university',
    title: 'Universities',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'University Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'reference',
            to: [{ type: 'country' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'University Logo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'asset', title: 'Image', type: 'image', options: { hotspot: true } }),
                        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'fullDescription',
            title: 'Full Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'ranking',
            title: 'World Ranking',
            type: 'string',
            description: 'e.g. "Top 100 QS" or "#47 Times Higher Education"',
        }),
        defineField({
            name: 'established',
            title: 'Established Year',
            type: 'number',
        }),
        defineField({
            name: 'studentCount',
            title: 'Number of Students',
            type: 'string',
            description: 'e.g. "30,000+"',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'City and country, e.g. "London, UK"',
        }),
        defineField({
            name: 'programs',
            title: 'Programs Offered',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of programs/faculties available',
        }),
        defineField({
            name: 'facilities',
            title: 'Facilities',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'admissionInfo',
            title: 'Admission Information',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'scholarships',
            title: 'Scholarships',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                defineField({ name: 'website', title: 'Website', type: 'url' }),
                defineField({ name: 'email', title: 'Email', type: 'string' }),
                defineField({ name: 'phone', title: 'Phone', type: 'string' }),
            ],
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured',
            type: 'boolean',
            description: 'Show this university in featured listings',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order within its country (lower = first)',
            initialValue: 0,
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Whether this university is publicly visible',
            initialValue: true,
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo',
            isActive: 'isActive',
            country: 'country.nameAz',
        },
        prepare(selection) {
            const { title, media, isActive, country } = selection
            return {
                title: `${title}${!isActive ? ' (Inactive)' : ''}`,
                subtitle: country,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'By Country',
            name: 'byCountry',
            by: [
                { field: 'country.nameAz', direction: 'asc' },
                { field: 'order', direction: 'asc' },
            ],
        },
    ],
})
