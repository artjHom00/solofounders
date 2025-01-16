import threadsService from '../../../services/threads'
import { SessionUser } from '../../../types/SessionUser'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)

    if (session.user == null) {
      throw new Error('NOT_AUTHORIZED')
    }

    const user = session.user as SessionUser

    const body = await readBody(event)

    if (body.content == null) {
      throw new Error('CONTENT_NOT_PROVIDED')
    }

    if (body.article == null || isNaN(Number(body.article))) {
      throw new Error('ARTICLE_NOT_PROVIDED')
    }

    if (body.replyTo != null && isNaN(Number(body.replyTo))) {
      throw new Error('REPLYTO_SHOULD_BE_NUMBER')
    }

    await threadsService.createThread(body.article, user.xId, body.content, body.replyTo)
  } catch (e) {
    return e
  }
})
