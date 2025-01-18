import { inArray } from 'drizzle-orm'
import { NewUser } from '../database/tables/users'
import { XAuthUser } from '../types/XAuthEvent'
import { tables, useDrizzle } from '../utils/drizzle'
import userService from './users'
import { IThread } from '~/types/thread/IThread'
import { IThreadExtended } from '~/types/thread/IThreadExtended'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'

class ThreadsService {
  async createThread (articleId: number, userXId: string, content: string, replyTo?: number) {
    const article = await useDrizzle().query.articles.findFirst({
      where: eq(tables.articles.id, articleId)
    })

    if (article == null) {
      throw new Error(ErrorsTemplates.ARTICLE_NOT_FOUND)
    }

    const user = await userService.getOrThrowUserByXId(userXId)

    let replyThreadId = replyTo;
    if (replyTo != null) {
      const thread = await useDrizzle().query.threads.findFirst({
        where: eq(tables.threads.id, replyTo)
      })

      if (thread == null) {
        throw new Error(ErrorsTemplates.THREAD_NOT_FOUND)
      }

      if(thread.replyTo != null) {
        replyThreadId = thread.replyTo
      }
    }

    const [{createdThreadId}] = await useDrizzle().insert(tables.threads).values({
      content,
      userId: user.id,
      articleId: article.id,
      replyTo: replyThreadId
    }).returning({ createdThreadId: tables.threads.id }).execute();

    const createdThread = await useDrizzle().query.threads.findFirst({
      where: eq(tables.threads.id, createdThreadId),
      with: {
        user: true
      }
    })

    if(createdThread == null) {
      throw new Error(ErrorsTemplates.INTERNAL_ERROR)
    }

    const [extendedThread] = await this.extendThreadsAttributes(user.id, [createdThread])

    return extendedThread
  }

  async upvoteThread (userXId: string, threadId: number) {
    await useDrizzle().transaction(async (tx) => {
      try {
        const user = await userService.getOrThrowUserByXId(userXId)

        const thread = await useDrizzle().query.threads.findFirst({
          where: eq(tables.threads.id, threadId)
        })

        if (thread == null) {
          throw new Error(ErrorsTemplates.THREAD_NOT_FOUND)
        }

        const userUpvote = await tx.select().from(tables.threadUpvotes).where(
          and(
            eq(tables.threadUpvotes.userId, user.id),
            eq(tables.threadUpvotes.threadId, threadId)
          )
        )

        if (userUpvote.length > 0) { throw new Error(ErrorsTemplates.ALREADY_UPVOTED) }

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

  async deleteThread (userXId: string, threadId: number) {
    const user = await userService.getOrThrowUserByXId(userXId)

    const [thread] = await useDrizzle().select().from(tables.threads).where(eq(tables.threads.id, threadId))
    if (thread == null) {
      throw new Error(ErrorsTemplates.THREAD_NOT_FOUND)
    }

    if (thread.userId !== user.id) {
      throw new Error(ErrorsTemplates.NOT_AUTHOR)
    }

    await useDrizzle().delete(tables.threads).where(eq(tables.threads.id, threadId)).execute()
  }

  async extendThreadsAttributes(userId: number, threads: IThread[]): Promise<IThreadExtended[]> {
    const threadsIds = threads.map(thread => thread.id)

    const userThreadsUpvotes = await useDrizzle().query.threadUpvotes.findMany({
      where: inArray(tables.threadUpvotes.threadId, threadsIds)
    })

    const extendedThreads: IThreadExtended[] = threads.map((thread) => {
      const userUpvote = userThreadsUpvotes.find(upvote => upvote.threadId === thread.id)
      return {
        ...thread,
        hasUpvoted: (userUpvote != null),
        isAuthor: userId === thread.userId
      }
    })
    
    return extendedThreads
  }

}

const threadsService = new ThreadsService()
export default threadsService
