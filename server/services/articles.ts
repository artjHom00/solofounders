import { count } from 'drizzle-orm'
import { NewArticle, articles } from '../database/tables/articles'
import { tables, useDrizzle } from '../utils/drizzle'
import userService from './users'
import { mockArticles } from '../static/articles'

class ArticleService {
  async seedArticlesIfNotExist () {
    const articles = await useDrizzle().select().from(tables.articles)

    if (articles.length > 0) { throw new Error('ARTICLES_ALREADY_SEEDED') }
    
    await useDrizzle().insert(tables.articles).values(mockArticles).execute()
  }

  async getLatestArticles (take: number, skip: number) {
    const articles = await useDrizzle().query.articles.findMany({
      with: {
        author: true
      },
      limit: take,
      offset: skip,
      orderBy: tables.articles.createdAt
    })

    const response = {
      data: articles,
      hasNextPage: await this.hasNextPage(take, skip)
    }

    return response
  }

  async getArticleById (id: number) {
    const article = await useDrizzle().query.articles.findFirst({
      with: {
        author: true
      },
      where: eq(tables.articles.id, id)
    })

    if (article == null) {
      throw new Error('ARTICLE_NOT_FOUND')
    }

    return article
  }

  async getArticleBySlug (slug: string, userXId?: string) {
    const article = await useDrizzle().query.articles.findFirst({
      with: {
        author: true
      },
      where: eq(tables.articles.slug, slug)
    })

    if (article == null) {
      throw new Error('ARTICLE_NOT_FOUND')
    }

    let hasUpvoted = false
    if (userXId != null) {
      const user = await userService.getOrThrowUserByXId(userXId)

      const usersUpvote = await useDrizzle().query.upvotes.findFirst({
        where: and(
          eq(tables.upvotes.userId, user.id),
          eq(tables.upvotes.articleId, article.id)
        )
      })

      hasUpvoted = (usersUpvote != null)
    }

    const response = {
      data: article,
      hasUpvoted
    }

    return response
  }

  async upvoteArticle (userXId: string, articleId: number) {
    await useDrizzle().transaction(async (tx) => {
      try {
        const user = await userService.getOrThrowUserByXId(userXId)

        const [article] = await tx.select().from(tables.articles).where(eq(tables.articles.id, articleId)).for('update')
        if (article == null) { throw new Error('ARTICLE_NOT_FOUND') }

        const userUpvote = await tx.select().from(tables.upvotes).where(
          and(
            eq(tables.upvotes.userId, user.id),
            eq(tables.upvotes.articleId, articleId)
          )
        )

        if (userUpvote.length > 0) { throw new Error('ALREADY_UPVOTED') }

        await tx.insert(tables.upvotes).values({
          userId: user.id,
          articleId
        })

        await tx.update(tables.articles).set({ points: article.points + 1 }).where(eq(tables.articles.id, articleId))
      } catch (e) {
        throw e
      }
    })
  }

  private async hasNextPage (take: number, skip: number) {
    const total = skip + take

    const [{ count: articlesCount }] = await useDrizzle().select({ count: count() }).from(articles)

    if (articlesCount <= total) {
      return false
    }

    return true
  }
}

const articleService = new ArticleService()
export default articleService
