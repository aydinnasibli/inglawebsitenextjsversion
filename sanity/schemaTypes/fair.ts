import { defineField, defineType } from 'sanity'

export const fair = defineType({
    name: 'fair',
    title: 'Sərgilər',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Sərginin Adı',
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
            name: 'startDate',
            title: 'Başlama Tarixi',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'Bitmə Tarixi',
            type: 'datetime',
        }),
        defineField({
            name: 'location',
            title: 'Yer / Məkan',
            type: 'string',
            description: 'Məsələn: Marriott Hotel, Bakı',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Qısa Təsvir',
            type: 'text',
            validation: (Rule) => Rule.required().max(220),
            description: 'Kart üçün qısa təsvir (maks. 220 simvol)',
        }),
        defineField({
            name: 'fullDescription',
            title: 'Ətraflı Məlumat',
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
            name: 'coverImage',
            title: 'Əsas Şəkil',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'participatingUniversities',
            title: 'İştirak Edən Universitetlər',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'universityName',
                            type: 'string',
                            title: 'Universitetin Adı',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'country',
                            type: 'string',
                            title: 'Ölkə',
                        },
                        {
                            name: 'logo',
                            type: 'image',
                            title: 'Logo',
                            options: { hotspot: true },
                        },
                    ],
                    preview: {
                        select: {
                            title: 'universityName',
                            subtitle: 'country',
                            media: 'logo',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'registrationLink',
            title: 'Qeydiyyat Linki',
            type: 'url',
            description: 'Xarici qeydiyyat linki (istəyə bağlı)',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Tezliklə', value: 'upcoming' },
                    { title: 'Davam edir', value: 'ongoing' },
                    { title: 'Tamamlandı', value: 'completed' },
                ],
                layout: 'radio',
            },
            initialValue: 'upcoming',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isActive',
            title: 'Aktiv',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Sıra',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Başlığı',
            type: 'string',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Təsviri',
            type: 'text',
            validation: (Rule) => Rule.max(160),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'location',
            media: 'coverImage',
            status: 'status',
            startDate: 'startDate',
        },
        prepare({ title, subtitle, media, status, startDate }) {
            const statusLabel = status === 'upcoming' ? '🟡 Tezliklə' : status === 'ongoing' ? '🟢 Davam edir' : '⚪ Tamamlandı'
            const date = startDate ? new Date(startDate).toLocaleDateString('az-AZ') : ''
            return {
                title: `${title} — ${statusLabel}`,
                subtitle: `${date} · ${subtitle}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Tarixə görə (yeni)',
            name: 'startDateDesc',
            by: [{ field: 'startDate', direction: 'desc' }],
        },
        {
            title: 'Sıra nömrəsinə görə',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})
