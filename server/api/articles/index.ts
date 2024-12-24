import { IArticle } from "~/types/article/IArticle"
import { tables, useDrizzle } from "../../utils/drizzle"

// here put the logic to check whether the account is created already or not
export default defineEventHandler(async (event) => {
    try {
        if (event.req.method !== 'GET') {
            return setResponseStatus(event, 404, 'Not Found')
        }

        const article: IArticle = {
            url: '/articles/test',
            name: 'Example Article',
            author: 'exampleAuthor',
            date: 'Sun, 22 Dec 2024 20:40:00 GMT',
            points: 0,
            views: 0,
            content: `
            ### Example
            `
        }

        return article
    } catch (e: any) {
        console.log("🚀 ~ defineEventHandler ~ e:", e)
        return setResponseStatus(event, 500, e.message || 'Internal Server Error')
    }
})