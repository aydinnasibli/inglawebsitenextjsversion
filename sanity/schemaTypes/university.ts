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
            name: 'logo',
            title: 'University Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
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
                title: `${title} ${!isActive ? '(Inactive)' : ''}`,
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
                { field: 'order', direction: 'asc' }
            ],
        },
    ],
})