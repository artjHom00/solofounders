import { asc, count, desc, ilike } from 'drizzle-orm'
import { NewArticle, articles } from '../database/tables/articles'
import { tables, useDrizzle } from '../utils/drizzle'
import { mockArticles } from '../static/articles'
import userService from './users'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'
import telegramBotService from './telegramBot'
import { Roles } from '~/types/user/Roles'

class ArticleService {
  async seedArticlesIfNotExist () {
    const articles = await useDrizzle().select().from(tables.articles)

    if (articles.length > 0) { throw new Error('ARTICLES_ALREADY_SEEDED') }

    await useDrizzle().insert(tables.articles).values(mockArticles).execute()
  }

  async getArticles (take: number, skip: number, onlyApproved: boolean, search?: string) {
        
    let whereClause;
    if(search != null) {
      whereClause = or(ilike(tables.articles.name, `%${search}%`), ilike(tables.articles.content, `%${search}%`))
    }

    if(onlyApproved === true) {
      whereClause = and(whereClause, eq(tables.articles.approved, true))
    }
      
    const articles = await useDrizzle().query.articles.findMany({
      with: { author: true },
      limit: take,
      offset: skip,
      orderBy: [desc(tables.articles.createdAt)],
      where: whereClause,
    });
  
    const response = {
      data: articles,
      hasNextPage: await this.hasNextPage(take, skip, search)
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
      throw new Error(ErrorsTemplates.ARTICLE_NOT_FOUND)
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
      throw new Error(ErrorsTemplates.ARTICLE_NOT_FOUND)
    }

    let hasUpvotedArticle: boolean = false
    let isArticleAuthor: boolean = false

    let isAvailableToView: boolean = article.approved;

    if (userXId != null) {
      const user = await userService.getOrThrowUserByXId(userXId)
      
      if(article.approved === false && (article.authorId !== user.id && user.role !== Roles.ADMIN)) {
        isAvailableToView = false;
        article.content = 'Not Moderated Yet'
      } else {
        isAvailableToView = true;
      }

      const usersUpvote = await useDrizzle().query.articleUpvotes.findFirst({
        where: and(
          eq(tables.articleUpvotes.userId, user.id),
          eq(tables.articleUpvotes.articleId, article.id)
        )
      })

      hasUpvotedArticle = (usersUpvote != null)
      isArticleAuthor = (article.authorId === user.id)
    }

    console.log("🚀 ~ ArticleService ~ getArticleBySlug ~ response.isAvailableToView:", isAvailableToView)
    const response = {
      data: article,
      isAvailable: isAvailableToView,
      isAuthor: isArticleAuthor,
      hasUpvoted: hasUpvotedArticle
    }

    return response
  }

  async upvoteArticle (userXId: string, articleId: number) {
    await useDrizzle().transaction(async (tx) => {
      try {
        const user = await userService.getOrThrowUserByXId(userXId)

        const [article] = await tx.select().from(tables.articles).where(eq(tables.articles.id, articleId)).for('update')
        if (article == null) { throw new Error(ErrorsTemplates.ARTICLE_NOT_FOUND) }

        const userUpvote = await tx.select().from(tables.articleUpvotes).where(
          and(
            eq(tables.articleUpvotes.userId, user.id),
            eq(tables.articleUpvotes.articleId, articleId)
          )
        )

        if (userUpvote.length > 0) { throw new Error(ErrorsTemplates.ALREADY_UPVOTED) }

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
    const moderationModeEnabled = (process.env.ARTICLES_MODERATION_REQUIRED != null && process.env.ARTICLES_MODERATION_REQUIRED === 'true')
    const user = await userService.getOrThrowUserByXId(userXId)

    const isValid = /^[A-Za-z0-9\s\-.,!?$£€¥"'`]+$/.test(name) && content.length >= 150
    if(isValid !== true) {
      throw new Error(ErrorsTemplates.VALIDATION_ERROR)
    }

    const slug = this.generateSlug(name)
    
    if(moderationModeEnabled) {
      telegramBotService.sendModerationRequest(slug)
    }

    await useDrizzle().insert(tables.articles).values({
      name,
      content,
      authorId: user.id,
      slug,
      approved: !moderationModeEnabled
    }).execute()

    return slug
  }

  async deleteArticle (userXId: string, articleId: number) {
    const user = await userService.getOrThrowUserByXId(userXId)

    const [article] = await useDrizzle().select().from(tables.articles).where(eq(tables.articles.id, articleId))
    if (article == null) {
      throw new Error(ErrorsTemplates.ARTICLE_NOT_FOUND)
    }

    if (article.authorId !== user.id) {
      throw new Error(ErrorsTemplates.NOT_AUTHOR)
    }

    await useDrizzle().delete(tables.articles).where(eq(tables.articles.id, articleId)).execute()
  }

  async approveArticle(articleSlug: string) {
    await useDrizzle().update(tables.articles).set({ approved: true }).where(eq(tables.articles.slug, articleSlug))
    return
  }

  async rejectArticle(articleSlug: string) {
    await useDrizzle().delete(tables.articles).where(eq(tables.articles.slug, articleSlug)).execute()
    return
  }

  private async hasNextPage (take: number, skip: number, search?: string) {
    const total = skip + take;

    const query = useDrizzle()
      .select({ count: count() })
      .from(articles);
  
    if (search != null) {
      query.where(
        or(
          ilike(tables.articles.name, `%${search}%`),
          ilike(tables.articles.content, `%${search}%`)
        )
      );
    }
  
    const [{ count: articlesCount }] = await query;
  
    return articlesCount > total;
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
