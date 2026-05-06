export const newsCategory = {
    name: 'newsCategory',
    title: 'News Category',
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
            options: { source: 'title', maxLength: 96 },
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
                    { title: 'Yellow', value: 'yellow' },
                    { title: 'Orange', value: 'orange' },
                    { title: 'Purple', value: 'purple' },
                ],
            },
        },
    ],
    preview: {
        select: { title: 'title', subtitle: 'description' },
    },
}
