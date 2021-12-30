import { TextBlock } from '../components/TextBlock'

export const parseBlock = block => {
    switch (block.type) {
        case 'heading_1':
            // <h1> is reserved for post titles so we use the next level down for post content
            return (
                <h2>
                    <TextBlock nodes={block.heading_1.text} />
                </h2>
            )

        case 'heading_2':
            return (
                <h3>
                    <TextBlock nodes={block.heading_2.text} />
                </h3>
            )

        case 'heading_3':
            return (
                <h4>
                    <TextBlock nodes={block.heading_3.text} />
                </h4>
            )

        case 'paragraph':
            return (
                <p>
                    <TextBlock nodes={block.paragraph.text} />
                </p>
            )

        case 'numbered_list_item':
            return (
                <li>
                    <TextBlock nodes={block.numbered_list_item.text} />
                </li>
            )

        case 'bulleted_list_item':
            return (
                <li>
                    <TextBlock nodes={block.bulleted_list_item.text} />
                </li>
            )

        case 'to_do':
            return (
                <div>
                    <label htmlFor={id}>
                        <input
                            type='checkbox'
                            id={id}
                            defaultChecked={value.checked}
                        />{' '}
                        <Text text={value.text} />
                    </label>
                </div>
            )
        case 'toggle':
            return (
                <details>
                    <summary>
                        <Text text={value.text} />
                    </summary>
                    {value.children?.map(block => (
                        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
                    ))}
                </details>
            )
        case 'child_page':
            return <p>{value.title}</p>
        case 'image':
            const src =
                value.type === 'external' ? value.external.url : value.file.url
            const caption = value.caption ? value.caption[0].plain_text : ''
            return (
                <figure>
                    <img src={src} alt={caption} />
                    {caption && <figcaption>{caption}</figcaption>}
                </figure>
            )
        case 'divider':
            return <hr key={id} />
        case 'quote':
            return <blockquote key={id}>{value.text[0].plain_text}</blockquote>

        default: {
            return 'Unsupported block :('
        }
    }
}
