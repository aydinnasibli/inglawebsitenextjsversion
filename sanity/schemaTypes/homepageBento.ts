import { defineField, defineType } from 'sanity'

export const homepageBento = defineType({
    name: 'homepageBento',
    title: 'Homepage Bento Box',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Card Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Card Description',
            type: 'text',
            description: 'Short supporting text for the card',
        }),
        defineField({
            name: 'image',
            title: 'Background / Featured Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'icon',
            title: 'Material Symbol Icon Name',
            type: 'string',
            description: 'e.g. "school", "public", "star", "groups" — see fonts.google.com/icons',
        }),
        defineField({
            name: 'link',
            title: 'Link URL',
            type: 'string',
            description: 'Internal path (e.g. /services) or external URL',
        }),
        defineField({
            name: 'linkLabel',
            title: 'Link Label',
            type: 'string',
            description: 'Call-to-action text (e.g. "Ətraflı Bax")',
        }),
        defineField({
            name: 'size',
            title: 'Card Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Large (2×2)', value: 'large' },
                    { title: 'Wide (2×1)', value: 'wide' },
                    { title: 'Tall (1×2)', value: 'tall' },
                    { title: 'Small (1×1)', value: 'small' },
                ],
                layout: 'radio',
            },
            initialValue: 'small',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'variant',
            title: 'Color Variant',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary (Yellow)', value: 'primary' },
                    { title: 'Dark', value: 'dark' },
                    { title: 'Light', value: 'light' },
                    { title: 'Image Background', value: 'image' },
                ],
                layout: 'radio',
            },
            initialValue: 'light',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'size',
            media: 'image',
            isActive: 'isActive',
        },
        prepare({ title, subtitle, media, isActive }) {
            return {
                title: `${title} ${!isActive ? '(Inactive)' : ''}`,
                subtitle: `Size: ${subtitle}`,
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
    ],
})
