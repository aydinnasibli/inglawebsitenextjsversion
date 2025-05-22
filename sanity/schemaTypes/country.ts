import { defineField, defineType } from 'sanity'

export const country = defineType({
    name: 'country',
    title: 'Countries',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Country Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'nameAz',
            title: 'Country Name (Azerbaijani)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            validation: (Rule) => Rule.required().max(200),
            description: 'Brief description for the country card',
        }),
        defineField({
            name: 'fullDescription',
            title: 'Full Description',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: 'flagImage',
            title: 'Flag Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'highlights',
            title: 'Country Highlights',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Highlight Title',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'description',
                            type: 'text',
                            title: 'Highlight Description',
                        },
                        {
                            name: 'icon',
                            type: 'string',
                            title: 'Icon Name',
                            description: 'Lucide icon name (e.g., "GraduationCap", "MapPin")',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'studyInfo',
            title: 'Study Information',
            type: 'object',
            fields: [
                {
                    name: 'language',
                    type: 'string',
                    title: 'Main Language',
                },
                {
                    name: 'currency',
                    type: 'string',
                    title: 'Currency',
                },
                {
                    name: 'averageCost',
                    type: 'string',
                    title: 'Average Study Cost',
                },
                {
                    name: 'livingCost',
                    type: 'string',
                    title: 'Average Living Cost',
                },
                {
                    name: 'applicationDeadline',
                    type: 'string',
                    title: 'Application Deadline',
                },
                {
                    name: 'visaRequirements',
                    type: 'array',
                    of: [{ type: 'string' }],
                    title: 'Visa Requirements',
                },
            ],
        }),
        defineField({
            name: 'popularPrograms',
            title: 'Popular Programs',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Most popular study programs in this country',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this country appears',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Whether this country should be displayed',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Country',
            type: 'boolean',
            description: 'Mark as featured on the countries page',
            initialValue: false,
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Title for search engines (optional)',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            description: 'Description for search engines (optional)',
            validation: (Rule) => Rule.max(160),
        }),
    ],
    preview: {
        select: {
            title: 'nameAz',
            subtitle: 'shortDescription',
            media: 'flagImage',
            isActive: 'isActive',
            isFeatured: 'isFeatured',
            order: 'order',
        },
        prepare(selection) {
            const { title, subtitle, media, isActive, isFeatured, order } = selection
            return {
                title: `${title} ${!isActive ? '(Inactive)' : ''} ${isFeatured ? '⭐' : ''}`,
                subtitle: `Order: ${order} - ${subtitle?.substring(0, 50)}...`,
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
            title: 'Featured First',
            name: 'featuredFirst',
            by: [
                { field: 'isFeatured', direction: 'desc' },
                { field: 'order', direction: 'asc' }
            ],
        },
    ],
})