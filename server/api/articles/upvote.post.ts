import articleService from "../../services/articles";
import { SessionUser } from "../../types/SessionUser";

export default defineEventHandler(async (event) => {
    try {
        const session = await getUserSession(event)

        if (session.user == null) {
            throw new Error('NOT_AUTHORIZED')
        }

        const user = session.user as SessionUser

        const body = await readBody(event);

        if (body.article == null) {
            throw new Error('ARTICLE_NOT_PROVIDED')
        }

        await articleService.upvoteArticle(user.xId, body.article)

        return
    } catch (e) {
        return e
    }
})