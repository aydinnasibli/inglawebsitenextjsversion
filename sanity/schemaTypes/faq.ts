import { defineField, defineType } from 'sanity'

export const faq = defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            validation: (Rule) => Rule.required().max(500),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Display order of the FAQ item',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Whether this FAQ should be displayed',
            initialValue: true,
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'General', value: 'general' },
                    { title: 'Admissions', value: 'admissions' },
                    { title: 'Programs', value: 'programs' },
                    { title: 'Study Abroad', value: 'study-abroad' },
                    { title: 'Preschool', value: 'preschool' },
                ],
            },
            initialValue: 'general',
        }),
    ],
    preview: {
        select: {
            title: 'question',
            order: 'order',
            isActive: 'isActive',
            category: 'category',
        },
        prepare(selection) {
            const { title, order, isActive, category } = selection
            return {
                title: `${title} ${!isActive ? '(Inactive)' : ''}`,
                subtitle: `${category} - Order: ${order}`,
            }
        },
    },
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Category',
            name: 'categoryAsc',
            by: [{ field: 'category', direction: 'asc' }],
        },
    ],
})