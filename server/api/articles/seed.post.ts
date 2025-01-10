import { NewArticle } from '../../database/tables/articles'
import articleService from '../../services/articles'
import { IBaseArticle } from '~/types/article/IBaseArticle'

export default defineEventHandler(async (event) => {
  try {
    await articleService.seedArticlesIfNotExist()
  } catch (e) {
    return e
  }
})
