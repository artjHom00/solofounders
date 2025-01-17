import { asc, count, desc, inArray } from 'drizzle-orm'
import { NewArticle, articles } from '../database/tables/articles'
import { tables, useDrizzle } from '../utils/drizzle'
import { mockArticles } from '../static/articles'
import userService from './users'

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
      orderBy: [desc(tables.articles.createdAt)]
    })

    const response = {
      data: articles,
      hasNextPage: await this.hasNextPage(take, skip)
    }

    return response
  }

  async getArticleById (articleId: number) {
    const article = await useDrizzle().query.articles.findFirst({
      with: {
        author: true
      },
      where: eq(tables.articles.id, articleId)
    })

    if (article == null) {
      throw new Error('ARTICLE_NOT_FOUND')
    }

    return article
  }

  async getArticleBySlug (slug: string, userXId?: string) {
    const article = await useDrizzle().query.articles.findFirst({
      with: {
        author: true,
        threads: {
          with: {
            user: {
              columns: {
                id: true,
                handle: true,
                avatar: true,
              }
            },
          },
          orderBy: [desc(sql`CASE WHEN ${tables.threads.replyTo} IS NULL THEN ${tables.threads.points} ELSE NULL END`), asc(tables.threads.createdAt)] // gpt generated
        },
      },
      where: eq(tables.articles.slug, slug),
    })

    if (article == null) {
      throw new Error('ARTICLE_NOT_FOUND')
    }

    const threadsIds = article.threads.map(thread => thread.id)

    let hasUpvotedArticle = false
    let isAuthor = false
    if (userXId != null) {
      const user = await userService.getOrThrowUserByXId(userXId)

      const usersUpvote = await useDrizzle().query.articleUpvotes.findFirst({
        where: and(
          eq(tables.articleUpvotes.userId, user.id),
          eq(tables.articleUpvotes.articleId, article.id)
        )
      })

      const usersUpvotes = await useDrizzle().query.threadUpvotes.findMany({
        where: inArray(tables.threadUpvotes.threadId, threadsIds)
      })

      article.threads = article.threads.map((thread) => {
        const userUpvote = usersUpvotes.find(upvote => upvote.threadId === thread.id)
        return {
          ...thread,
          hasUpvoted: (userUpvote != null)
        }
      })

      hasUpvotedArticle = (usersUpvote != null)
      isAuthor = article.authorId === user.id
    }

    const response = {
      data: article,
      isAuthor,
      hasUpvoted: hasUpvotedArticle
    }

    return response
  }

  async upvoteArticle (userXId: string, articleId: number) {
    await useDrizzle().transaction(async (tx) => {
      try {
        const user = await userService.getOrThrowUserByXId(userXId)

        const [article] = await tx.select().from(tables.articles).where(eq(tables.articles.id, articleId)).for('update')
        if (article == null) { throw new Error('ARTICLE_NOT_FOUND') }

        const userUpvote = await tx.select().from(tables.articleUpvotes).where(
          and(
            eq(tables.articleUpvotes.userId, user.id),
            eq(tables.articleUpvotes.articleId, articleId)
          )
        )

        if (userUpvote.length > 0) { throw new Error('ALREADY_UPVOTED') }

        await tx.insert(tables.articleUpvotes).values({
          userId: user.id,
          articleId
        })

        await tx.update(tables.articles).set({ points: article.points + 1 }).where(eq(tables.articles.id, articleId))
      } catch (e) {
        throw e
      }
    })
  }

  async createArticle (userXId: string, name: string, content: string) {
    const user = await userService.getOrThrowUserByXId(userXId)

    const slug = this.generateSlug(name)
    await useDrizzle().insert(tables.articles).values({
      name,
      content,
      authorId: user.id,
      slug
    }).execute()

    return slug
  }

  async deleteArticle (userXId: string, articleId: number) {
    const user = await userService.getOrThrowUserByXId(userXId)

    const [article] = await useDrizzle().select().from(tables.articles).where(eq(tables.articles.id, articleId))
    if (article == null) {
      throw new Error('ARTICLE_NOT_FOUND')
    }

    if (article.authorId !== user.id) {
      throw new Error('NOT_AUTHOR_OF_ARTICLE')
    }

    await useDrizzle().delete(tables.articles).where(eq(tables.articles.id, articleId)).execute()
  }

  private async hasNextPage (take: number, skip: number) {
    const total = skip + take

    const [{ count: articlesCount }] = await useDrizzle().select({ count: count() }).from(articles)

    if (articlesCount <= total) {
      return false
    }

    return true
  }

  private generateSlug (text: string): string {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing whitespace
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading or trailing hyphens
  }
}

const articleService = new ArticleService()
export default articleService
