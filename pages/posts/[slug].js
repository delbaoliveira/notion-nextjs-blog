import { TextBlock } from '../../components/TextBlock'
import { getBlocks, getPost, getPostList } from '../../lib/notion'
import { parseBlock } from '../../lib/parseBlock'
import React from 'react'
import Head from 'next/head'

export async function getStaticPaths() {
    const posts = await getPostList(process.env.DATABASE_ID)
    return {
        paths: posts.map(post => ({
            params: {
                slug: post.properties.Slug.rich_text[0].plain_text,
            },
        })),
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ params }) => {
    const { slug } = params
    const database = await getPostList(process.env.DATABASE_ID)
    const filter = database.filter(
        page => page.properties.Slug.rich_text[0].plain_text === slug,
    )
    const post = await getPost(filter[0].id)
    const blocks = await getBlocks(filter[0].id)

    const childBlocks = await Promise.all(
        blocks
            .filter(block => block.has_children)
            .map(async block => {
                return {
                    id: block.id,
                    children: await getBlocks(block.id),
                }
            }),
    )
    const blocksWithChildren = blocks.map(block => {
        // Add child blocks if the block should contain children but none exists
        if (block.has_children && !block[block.type].children) {
            block[block.type]['children'] = childBlocks.find(
                x => x.id === block.id,
            )?.children
        }
        return block
    })

    return {
        props: {
            post,
            blocks: blocksWithChildren,
        },
        revalidate: 1800,
    }
}

export default function Post({ post, blocks }) {
    return (
        <div className='mx-auto py-24 prose'>
            <Head>
                <title>{post.properties.Name.title[0].plain_text}</title>
            </Head>
            <h1>
                <TextBlock nodes={post.properties.Name.title} />
            </h1>

            {blocks.map(block => (
                <React.Fragment key={block.id}>
                    {parseBlock(block)}
                </React.Fragment>
            ))}
        </div>
    )
}
