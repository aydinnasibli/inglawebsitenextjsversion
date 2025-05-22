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
            options: {
                source: 'name',
                maxLength: 96,
            },
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
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            validation: (Rule) => Rule.required().max(200),
            description: 'Brief description for the university card',
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
            name: 'logo',
            title: 'University Logo',
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
            title: 'Campus Gallery',
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
            name: 'ranking',
            title: 'World Ranking',
            type: 'string',
            description: 'e.g., Top 100, QS Ranking #250',
        }),
        defineField({
            name: 'established',
            title: 'Established Year',
            type: 'number',
        }),
        defineField({
            name: 'studentCount',
            title: 'Student Count',
            type: 'string',
            description: 'e.g., 25,000+ students',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'object',
            fields: [
                {
                    name: 'city',
                    type: 'string',
                    title: 'City',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'address',
                    type: 'text',
                    title: 'Full Address',
                },
                {
                    name: 'coordinates',
                    type: 'geopoint',
                    title: 'Coordinates',
                },
            ],
        }),
        defineField({
            name: 'programs',
            title: 'Available Programs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            type: 'string',
                            title: 'Program Name',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'degree',
                            type: 'string',
                            title: 'Degree Level',
                            options: {
                                list: [
                                    { title: 'Bachelor', value: 'bachelor' },
                                    { title: 'Master', value: 'master' },
                                    { title: 'PhD', value: 'phd' },
                                    { title: 'Foundation', value: 'foundation' },
                                    { title: 'Certificate', value: 'certificate' },
                                ],
                            },
                        },
                        {
                            name: 'duration',
                            type: 'string',
                            title: 'Duration',
                        },
                        {
                            name: 'tuitionFee',
                            type: 'string',
                            title: 'Tuition Fee',
                        },
                        {
                            name: 'requirements',
                            type: 'array',
                            of: [{ type: 'string' }],
                            title: 'Entry Requirements',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'facilities',
            title: 'Campus Facilities',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of available facilities',
        }),
        defineField({
            name: 'admissionInfo',
            title: 'Admission Information',
            type: 'object',
            fields: [
                {
                    name: 'applicationDeadline',
                    type: 'string',
                    title: 'Application Deadline',
                },
                {
                    name: 'applicationFee',
                    type: 'string',
                    title: 'Application Fee',
                },
                {
                    name: 'requirements',
                    type: 'array',
                    of: [{ type: 'string' }],
                    title: 'General Requirements',
                },
                {
                    name: 'documents',
                    type: 'array',
                    of: [{ type: 'string' }],
                    title: 'Required Documents',
                },
            ],
        }),
        defineField({
            name: 'scholarships',
            title: 'Available Scholarships',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            type: 'string',
                            title: 'Scholarship Name',
                        },
                        {
                            name: 'amount',
                            type: 'string',
                            title: 'Amount/Percentage',
                        },
                        {
                            name: 'criteria',
                            type: 'text',
                            title: 'Eligibility Criteria',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                {
                    name: 'website',
                    type: 'url',
                    title: 'Official Website',
                },
                {
                    name: 'admissionsEmail',
                    type: 'string',
                    title: 'Admissions Email',
                },
                {
                    name: 'phone',
                    type: 'string',
                    title: 'Phone Number',
                },
            ],
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this university appears within its country',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Whether this university should be displayed',
            initialValue: true,
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured University',
            type: 'boolean',
            description: 'Mark as featured university',
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
            title: 'name',
            subtitle: 'shortDescription',
            media: 'logo',
            isActive: 'isActive',
            isFeatured: 'isFeatured',
            country: 'country.nameAz',
        },
        prepare(selection) {
            const { title, subtitle, media, isActive, isFeatured, country } = selection
            return {
                title: `${title} ${!isActive ? '(Inactive)' : ''} ${isFeatured ? '⭐' : ''}`,
                subtitle: `${country} - ${subtitle?.substring(0, 40)}...`,
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
        {
            title: 'By Country',
            name: 'byCountry',
            by: [
                { field: 'country.nameAz', direction: 'asc' },
                { field: 'order', direction: 'asc' }
            ],
        },
    ],
})