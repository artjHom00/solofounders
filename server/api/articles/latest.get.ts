import articleService from '../../services/articles'
import { paginationSchema } from '../../validation/pagination'
import { IBaseArticle } from '~/types/article/IBaseArticle'

// here put the logic to check whether the account is created already or not
export default defineEventHandler(async (event) => {
  try {
    const query = await getValidatedQuery(event, paginationSchema.parse)

    const latestArticles = await articleService.getLatestArticles(query.take, query.skip)
    return latestArticles
  } catch (e) {
    return e
  }
})
