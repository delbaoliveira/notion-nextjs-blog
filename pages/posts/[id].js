import { TextBlock } from "@/components/TextBlock"
import { getBlocks, getPost, getPostList } from "@/lib/notion"
import { parseBlock } from "@/lib/parseBlock"
import React from "react"

export async function getStaticPaths() {
  const posts = await getPostList(process.env.DATABASE_ID)
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: "blocking",
  }
}

export const getStaticProps = async ({ params: { id } }) => {
  const post = await getPost(id)
  const blocks = await getBlocks(id)
  return { props: { post, blocks } }
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
