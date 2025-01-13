import articleService from '../../services/articles'
import { byIdSchema } from '../../validation/byId'
import { bySlugSchema } from '../../validation/bySlug'
import { SessionUser } from '../../types/SessionUser'
import { IArticle } from '~/types/article/IArticle'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)

    if (session.user == null) {
      throw new Error('NOT_AUTHORIZED')
    }

    const user = session.user as SessionUser

    const body = await readBody(event)

    if (body.article == null) {
      throw new Error('ARTICLE_NOT_PROVIDED')
    }

    await articleService.deleteArticle(user.xId, body.article)
  } catch (e) {
    return e
  }
})
