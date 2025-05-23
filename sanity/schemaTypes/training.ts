// schemas/training.ts
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'training',
    title: 'Training',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                        annotations: [
                            {
                                title: 'URL',
                                name: 'link',
                                type: 'object',
                                fields: [
                                    {
                                        title: 'URL',
                                        name: 'href',
                                        type: 'url',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'string',
            description: 'e.g., "2 weeks", "1 month"',
        }),
        defineField({
            name: 'level',
            title: 'Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Beginner', value: 'beginner' },
                    { title: 'Intermediate', value: 'intermediate' },
                    { title: 'Advanced', value: 'advanced' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Web Development', value: 'web-development' },
                    { title: 'Mobile Development', value: 'mobile-development' },
                    { title: 'Data Science', value: 'data-science' },
                    { title: 'Design', value: 'design' },
                    { title: 'DevOps', value: 'devops' },
                ],
            },
        }),
        defineField({
            name: 'instructor',
            title: 'Instructor',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'datetime',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'datetime',
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'featuredImage',
            subtitle: 'category',
        },
    },
})