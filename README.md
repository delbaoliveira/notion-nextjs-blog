A  *proof of concept* for a blog using [Next.js](https://nextjs.org/) and the new [Notion API](https://developers.notion.com/).  

### How it works:
1. Blog posts are stored as Notion pages in a [database (full page table)](https://www.notion.so/d759219987664088a6030440b8cf7225?v=341342e466484779be4a130021f0ed01).
2. A [Notion integration](https://developers.notion.com/docs/getting-started) generates a token to authorize access to the database.
3. A client is initialized using the [Notion SDK](https://developers.notion.com/reference/authentication).
4. For this specific example, only pages marked as `published` in the table properties are fetched using the API's [filter param](https://developers.notion.com/reference/post-database-query#post-database-query-filter). 
5. `getStaticProps()` uses incremental static regeneration to update pages in the background ([more info](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)). 
6. Dynamic pages are generated using Notion's [page ids](https://developers.notion.com/reference/get-page).  


### Considerations:

- The Notion API currently only supports text blocks and these need to be fetched separetely from pages.
- Text blocks are returned as strings and need to be styled with CSS to recreate the rich text format.
- Currently there is no support for custom post URLs as you can only query posts by id.

### To dos:

- [ ] Add support for nested blocks such as indented paragraphs or lists. 
