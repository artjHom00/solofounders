import articleService from '../../services/articles'
import { getLatestSchema } from '../../validation/getLatest'
import { IBaseArticle } from '~/types/article/IBaseArticle'

// here put the logic to check whether the account is created already or not
export default defineEventHandler(async (event) => {
  try {
    const query = await getValidatedQuery(event, getLatestSchema.parse)

    const latestArticles = await articleService.getArticles(query.take, query.skip, query.search)
    return latestArticles
  } catch (e) {
    return e
  }
})
