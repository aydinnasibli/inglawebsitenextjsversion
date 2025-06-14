// schemas/category.ts
export const category = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'color',
            title: 'Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Red', value: 'red' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Yellow', value: 'yellow' },
                    { title: 'Gray', value: 'gray' },
                ],
            },
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
}