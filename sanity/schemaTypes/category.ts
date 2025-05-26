// sanity/schemaTypes/category.ts
import { defineField, defineType } from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Category',
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
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Red', value: 'red' },
                    { title: 'Yellow', value: 'yellow' },
                    { title: 'Pink', value: 'pink' },
                    { title: 'Indigo', value: 'indigo' },
                    { title: 'Gray', value: 'gray' },
                ],
            },
            initialValue: 'blue',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
})