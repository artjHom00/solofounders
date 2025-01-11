import articleService from '../../services/articles'
import { SessionUser } from '../../types/SessionUser'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)

    if (session.user == null) {
      throw new Error('NOT_AUTHORIZED')
    }

    const user = session.user as SessionUser

    const body = await readBody(event)

    if (body.content == null) {
      throw new Error('CONTENT_NOT_PROVIDED')
    }

    if (body.name == null || body.name === '') {
      throw new Error('ARTICLE_NAME_NOT_PROVIDED')
    }

    const createdUrl = await articleService.createArticle(user.xId, body.name, body.content)
    return createdUrl
  } catch (e) {
    return e
  }
})
