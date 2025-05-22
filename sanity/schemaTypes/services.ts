import { defineField, defineType } from 'sanity'

export const services = defineType({
    name: 'services',
    title: 'Services (Tədris İstiqamətləri)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Service Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            validation: (Rule) => Rule.required().max(200),
            description: 'Brief description for the services listing page',
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
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
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
            name: 'keyFeatures',
            title: 'Key Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'feature',
                            type: 'string',
                            title: 'Feature',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'description',
                            type: 'text',
                            title: 'Feature Description',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'targetAudience',
            title: 'Target Audience',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Who is this service for?',
        }),
        defineField({
            name: 'duration',
            title: 'Course Duration',
            type: 'string',
            description: 'e.g., 6 months, 1 year, etc.',
        }),
        defineField({
            name: 'priceRange',
            title: 'Price Range',
            type: 'string',
            description: 'e.g., 200-500 AZN, Contact for pricing',
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                {
                    name: 'phone',
                    type: 'string',
                    title: 'Phone',
                },
                {
                    name: 'email',
                    type: 'string',
                    title: 'Email',
                },
                {
                    name: 'whatsapp',
                    type: 'string',
                    title: 'WhatsApp',
                },
            ],
        }),
        defineField({
            name: 'scheduleInfo',
            title: 'Schedule Information',
            type: 'text',
            description: 'Class schedules and timing information',
        }),
        defineField({
            name: 'requirements',
            title: 'Requirements',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Prerequisites or requirements for this service',
        }),

        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this service appears on the services page',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Whether this service should be displayed',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Service',
            type: 'boolean',
            description: 'Mark as featured on the services page',
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
            title: 'title',
            media: 'featuredImage',
            category: 'category',
            isActive: 'isActive',
            isFeatured: 'isFeatured',
            order: 'order',
        },
        prepare(selection) {
            const { title, media, category, isActive, isFeatured, order } = selection
            return {
                title: `${title} ${!isActive ? '(Inactive)' : ''} ${isFeatured ? '⭐' : ''}`,
                subtitle: `${category} - Order: ${order}`,
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
            title: 'Category',
            name: 'categoryAsc',
            by: [{ field: 'category', direction: 'asc' }],
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