import { TextBlock } from "@/components/TextBlock"
import { getBlocks, getPost, getPostList, getPostIdFromSlug } from "@/lib/notion"
import { parseBlock } from "@/lib/parseBlock"
import React from "react"

export async function getStaticPaths() {
  const posts = await getPostList(process.env.DATABASE_ID)
  const slugs = posts.map(post => post.properties.Slug.rich_text[0].text.content)
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const posts = await getPostList(process.env.DATABASE_ID)
  const id = posts.find(post => post.properties.Slug.rich_text[0].text.content == slug).id || process.env.DEFAULT_POST_ID
  const post = await getPost(id)
  const blocks = await getBlocks(id)
  return {
    props: { post, blocks },
    revalidate: 1800,
  }
}

export default function Post({ post, blocks }) {
  return (
    <div className="mx-auto py-24 prose">
      <h1>
        <TextBlock nodes={post.properties.Name.title} />
      </h1>

      {blocks.map((block) => (
        <React.Fragment key={block.id}>{parseBlock(block)}</React.Fragment>
      ))}
    </div>
  )
}
