import { defineField, defineType } from 'sanity'

export const homepageCarousel = defineType({
    name: 'homepageCarousel',
    title: 'Homepage Carousel',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
        }),
        defineField({
            name: 'buttonLink',
            title: 'Button Link',
            type: 'url',
            description: 'Optional link for the button',
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Display order of the carousel item',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Whether this carousel item should be displayed',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            order: 'order',
            isActive: 'isActive',
        },
        prepare(selection) {
            const { title, media, order, isActive } = selection
            return {
                title: `${title} ${!isActive ? '(Inactive)' : ''}`,
                subtitle: `Order: ${order}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})