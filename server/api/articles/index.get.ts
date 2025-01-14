import articleService from '../../services/articles'
import { byIdSchema } from '../../validation/byId'
import { bySlugSchema } from '../../validation/bySlug'
import { SessionUser } from '../../types/SessionUser'
import { IArticle } from '~/types/article/IArticle'
import articlesStatisticsService from '../../services/articlesStatistics'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)
    const user = session.user as SessionUser | undefined

    const query = await getValidatedQuery(event, bySlugSchema.parse)

    const article = await articleService.getArticleBySlug(query.slug, user?.xId)
    await articlesStatisticsService.addView(article.data.id)

    return article
  } catch (e) {
    return e
  }
})
