import { inArray } from 'drizzle-orm'
import { NewUser } from '../database/tables/users'
import { XAuthUser } from '../types/XAuthEvent'
import { tables, useDrizzle } from '../utils/drizzle'
import userService from './users'

class ThreadsService {
  async createThread (articleId: number, userXId: string, content: string, replyTo?: number) {
    const article = await useDrizzle().query.articles.findFirst({
      where: eq(tables.articles.id, articleId)
    })

    if (article == null) {
      throw new Error('ARTICLE_NOT_FOUND')
    }

    const user = await userService.getOrThrowUserByXId(userXId)

    if (replyTo != null) {
      const thread = await useDrizzle().query.threads.findFirst({
        where: eq(tables.threads.id, replyTo)
      })

      if (thread == null) {
        throw new Error('THREAD_NOT_FOUND')
      }
    }

    await useDrizzle().insert(tables.threads).values({
      content,
      userId: user.id,
      articleId: article.id,
      replyTo: replyTo ?? null
    }).execute()
  }

  async upvoteThread (userXId: string, threadId: number) {
    await useDrizzle().transaction(async (tx) => {
      try {
        const user = await userService.getOrThrowUserByXId(userXId)

        const thread = await useDrizzle().query.threads.findFirst({
          where: eq(tables.threads.id, threadId)
        })

        if (thread == null) {
          throw new Error('THREAD_NOT_FOUND')
        }

        const userUpvote = await tx.select().from(tables.threadUpvotes).where(
          and(
            eq(tables.threadUpvotes.userId, user.id),
            eq(tables.threadUpvotes.threadId, threadId)
          )
        )

        if (userUpvote.length > 0) { throw new Error('ALREADY_UPVOTED') }

        await tx.insert(tables.threadUpvotes).values({
          userId: user.id,
          threadId
        })

        await tx.update(tables.threads).set({ points: thread.points + 1 }).where(eq(tables.threads.id, threadId))
      } catch (e) {
        throw e
      }
    })
  }
}

const threadsService = new ThreadsService()
export default threadsService
