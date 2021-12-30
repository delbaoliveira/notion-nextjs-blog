import { getPostList } from '../lib/notion'
import Link from 'next/link'

export const getStaticProps = async () => {
    const posts = await getPostList(process.env.DATABASE_ID)
    return {
        props: { posts },
        revalidate: 60,
    }
}

export default function Home({ posts }) {
    return (
        <div className='container mx-auto py-12 space-y-6'>
            <h1 className='text-6xl font-bold'>Blog</h1>

            {posts.map(post => {
                const date = new Date(
                    post.properties.PublishedOn.date.start,
                ).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                })
                return (
                    <div key={post.id}>
                        <h2 className='text-2xl font-medium'>
                            <Link
                                href={`/posts/${post.properties.Slug.rich_text[0].plain_text}`}
                            >
                                <a className='hover:text-gray-600'>
                                    {post.properties.Name.title[0].plain_text}
                                </a>
                            </Link>
                        </h2>
                        <ul>
                            <li>Date: {date}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
