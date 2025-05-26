// sanity/schemaTypes/author.ts
import { defineField, defineType } from 'sanity'

export const author = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 4,
            description: 'Short bio of the author',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                {
                    name: 'twitter',
                    title: 'Twitter',
                    type: 'url',
                },
                {
                    name: 'linkedin',
                    title: 'LinkedIn',
                    type: 'url',
                },
                {
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'url',
                },
                {
                    name: 'website',
                    title: 'Website',
                    type: 'url',
                },
            ],
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
})