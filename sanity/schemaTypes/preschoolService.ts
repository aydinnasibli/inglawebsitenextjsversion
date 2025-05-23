// sanity/schemas/preschoolService.ts

import { defineField, defineType } from 'sanity'
import { Users } from 'lucide-react'

export const preschool = defineType({
    name: 'preschoolService',
    title: 'Məktəbəqədər Xidmətlər',
    type: 'document',
    icon: Users,
    fields: [
        defineField({
            name: 'title',
            title: 'Xidmət Adı',
            type: 'string',
            validation: (Rule) => Rule.required().min(3).max(100),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Qısa Təsvir',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().min(50).max(300),
            description: 'Xidmətlərin siyahısında göstəriləcək qısa təsvir',
        }),
        defineField({
            name: 'fullDescription',
            title: 'Ətraflı Təsvir',
            type: 'text',
            rows: 6,
            description: 'Xidmətin ətraflı təsviri',
        }),
        defineField({
            name: 'featuredImage',
            title: 'Əsas Şəkil',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Şəkil Qalereyası',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Şəkil Başlığı',
                        },
                    ],
                },
            ],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'keyFeatures',
            title: 'Əsas Xüsusiyyətlər',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'feature',
                            title: 'Xüsusiyyət',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'description',
                            title: 'Təsvir',
                            type: 'text',
                            rows: 2,
                        },
                    ],
                    preview: {
                        select: {
                            title: 'feature',
                            subtitle: 'description',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'targetAgeGroup',
            title: 'Hədəf Yaş Qrupu',
            type: 'string',
            placeholder: 'Məsələn: 3-6 yaş',
        }),
        defineField({
            name: 'duration',
            title: 'Müddət',
            type: 'string',
            placeholder: 'Məsələn: 6 ay, 1 il',
        }),
        defineField({
            name: 'priceRange',
            title: 'Qiymət Aralığı',
            type: 'string',
            placeholder: 'Məsələn: 100-200 AZN/ay',
        }),
        defineField({
            name: 'contactInfo',
            title: 'Əlaqə Məlumatları',
            type: 'object',
            fields: [
                {
                    name: 'phone',
                    title: 'Telefon',
                    type: 'string',
                    placeholder: '+994 XX XXX XX XX',
                },
                {
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule) => Rule.email(),
                },
                {
                    name: 'whatsapp',
                    title: 'WhatsApp',
                    type: 'string',
                    placeholder: '994XXXXXXXXX (ölkə kodu ilə)',
                },
            ],
        }),
        defineField({
            name: 'scheduleInfo',
            title: 'Cədvəl Məlumatı',
            type: 'text',
            rows: 3,
            placeholder: 'Həftənin günləri və saatlar',
        }),
        defineField({
            name: 'requirements',
            title: 'Tələblər',
            type: 'array',
            of: [
                {
                    type: 'string',
                },
            ],
            description: 'Xidmətdən istifadə üçün tələblər',
        }),
        defineField({
            name: 'activities',
            title: 'Fəaliyyətlər',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'activity',
                            title: 'Fəaliyyət',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'description',
                            title: 'Təsvir',
                            type: 'text',
                            rows: 2,
                        },
                    ],
                    preview: {
                        select: {
                            title: 'activity',
                            subtitle: 'description',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'learningOutcomes',
            title: 'Öyrənmə Nəticələri',
            type: 'array',
            of: [
                {
                    type: 'string',
                },
            ],
            description: 'Uşaqların əldə edəcəyi bacarıqlar və bilik',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            initialValue: 0,
            description: 'Xidmətlərin göstərilmə sırası (kiçik rəqəm əvvəl)',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Populyar Xidmət',
            type: 'boolean',
            initialValue: false,
            description: 'Bu xidməti populyar kimi işarələ',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Başlık',
            type: 'string',
            validation: (Rule) => Rule.max(60),
            description: 'Axtarış motorları üçün başlıq (60 simvoldan az)',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Təsvir',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(160),
            description: 'Axtarış motorları üçün təsvir (160 simvoldan az)',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'shortDescription',
            media: 'featuredImage',
            featured: 'isFeatured',
        },
        prepare(selection) {
            const { title, subtitle, media, featured } = selection
            return {
                title: featured ? `⭐ ${title}` : title,
                subtitle: subtitle,
                media: media,
            }
        },
    },
    orderings: [
        {
            title: 'Populyar Əvvəl',
            name: 'featuredFirst',
            by: [
                { field: 'isFeatured', direction: 'desc' },
                { field: 'order', direction: 'asc' },
                { field: 'title', direction: 'asc' },
            ],
        },
        {
            title: 'Sıralama',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Əlifba Sırası',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
})