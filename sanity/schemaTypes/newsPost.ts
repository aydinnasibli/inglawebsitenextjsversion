export const newsPost = {
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                { name: 'alt', type: 'string', title: 'Alternative Text' },
            ],
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'newsCategory' } }],
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4,
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Show this news item in the homepage hero section',
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                { name: 'title', title: 'SEO Title', type: 'string' },
                { name: 'description', title: 'SEO Description', type: 'text', rows: 3 },
                { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
            ],
        },
    ],
    orderings: [
        {
            title: 'Published Date, New',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: { title: 'title', media: 'mainImage' },
    },
}
