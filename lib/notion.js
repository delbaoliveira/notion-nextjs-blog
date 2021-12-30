const { Client } = require('@notionhq/client')

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export const getPostList = async databaseId => {
    const response = await client.databases.query({
        database_id: databaseId,
        filter: {
            property: 'Status',
            select: {
                equals: 'Published',
            },
            sorts: [
                {
                    property: 'PublishedOn',
                    direction: 'descending',
                },
            ],
        },
    })
    return response.results
}

export const getPost = async pageId => {
    const response = await client.pages.retrieve({ page_id: pageId })
    return response
}

export const getBlocks = async blockId => {
    const response = await client.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    })
    return response.results
}
