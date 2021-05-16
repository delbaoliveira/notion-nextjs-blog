const { Client } = require("@notionhq/client")

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export const getPostList = async (databaseId) => {
  const response = await client.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  })
  return response.results
}

