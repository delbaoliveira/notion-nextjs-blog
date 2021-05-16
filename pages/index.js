import { getPostList } from "@/lib/notion"
import Link from "next/link"

export const getStaticProps = async () => {
  const posts = await getPostList(process.env.DATABASE_ID)
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <div>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              {/* Clean up this crazy dot notation and format the data please girl */}
              <Link href={`/posts/${post.id}`}>
                <a>{post.properties.Name.title[0].plain_text}</a>
              </Link>
              <p>{post.properties.Date.date.start}</p>
              <p>{post.properties.Category.select.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
