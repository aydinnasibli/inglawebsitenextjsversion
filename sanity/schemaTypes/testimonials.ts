import { defineField, defineType } from 'sanity'

export const testimonials = defineType({
    name: 'testimonials',
    title: 'Testimonials',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'position',
            title: 'Position/Title',
            type: 'string',
            description: 'e.g., Student, Parent, Graduate',
        }),
        defineField({
            name: 'company',
            title: 'Company/Institution',
            type: 'string',
            description: 'Optional - where they work or study',
        }),
        defineField({
            name: 'testimonial',
            title: 'Testimonial',
            type: 'text',
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'image',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Optional photo of the person',
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5),
            description: 'Rating out of 5 stars',
            initialValue: 5,
        }),
        defineField({
            name: 'program',
            title: 'Program',
            type: 'string',
            options: {
                list: [
                    { title: 'Language Courses', value: 'language-courses' },
                    { title: 'Study Abroad', value: 'study-abroad' },
                    { title: 'Preschool', value: 'preschool' },
                    { title: 'Training Center', value: 'training-center' },
                    { title: 'General', value: 'general' },
                ],
            },
            initialValue: 'general',
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Display order of the testimonial',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Whether this testimonial should be displayed',
            initialValue: true,
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Mark as featured testimonial',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'testimonial',
            media: 'image',
            isActive: 'isActive',
            featured: 'featured',
        },
        prepare(selection) {
            const { title, subtitle, media, isActive, featured } = selection
            return {
                title: `${title} ${!isActive ? '(Inactive)' : ''} ${featured ? '⭐' : ''}`,
                subtitle: subtitle?.substring(0, 60) + '...',
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
        {
            title: 'Featured First',
            name: 'featuredFirst',
            by: [
                { field: 'featured', direction: 'desc' },
                { field: 'order', direction: 'asc' }
            ],
        },
    ],
})