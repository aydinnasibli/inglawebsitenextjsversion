// sanity/schemaTypes/blockContent.ts
import { defineType, defineArrayMember } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export const blockContent = defineType({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        defineArrayMember({
            title: 'Block',
            type: 'block',
            // Styles let you set what your user can mark up blocks with. These
            // correspond with HTML tags, but you can set any title or value
            // you want and decide how you want to deal with it where you want to
            // use your content.
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            // Marks let you mark up inline text in the block editor.
            marks: {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Code', value: 'code' },
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
                annotations: [
                    {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                                validation: (Rule) => Rule.uri({
                                    scheme: ['http', 'https', 'mailto', 'tel']
                                })
                            },
                            {
                                title: 'Open in new tab',
                                name: 'blank',
                                type: 'boolean',
                                initialValue: false,
                            },
                        ],
                    },
                ],
            },
        }),
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        defineArrayMember({
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                },
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                },
            ],
        }),
        defineArrayMember({
            type: 'object',
            name: 'codeBlock',
            title: 'Code Block',
            fields: [
                {
                    name: 'language',
                    title: 'Language',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'JavaScript', value: 'javascript' },
                            { title: 'TypeScript', value: 'typescript' },
                            { title: 'HTML', value: 'html' },
                            { title: 'CSS', value: 'css' },
                            { title: 'Python', value: 'python' },
                            { title: 'Java', value: 'java' },
                            { title: 'C++', value: 'cpp' },
                            { title: 'JSON', value: 'json' },
                            { title: 'Bash', value: 'bash' },
                        ],
                    },
                },
                {
                    name: 'code',
                    title: 'Code',
                    type: 'text',
                    rows: 10,
                },
            ],
            preview: {
                select: {
                    title: 'language',
                    subtitle: 'code',
                },
                prepare({ title, subtitle }) {
                    return {
                        title: `Code block (${title || 'Plain text'})`,
                        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : 'Empty code block',
                    }
                },
            },
        }),
    ],
})