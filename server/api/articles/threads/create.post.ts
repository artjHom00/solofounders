import threadsService from '../../../services/threads'
import { SessionUser } from '../../../../types/SessionUser'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)

    if (session.user == null) {
      throw new Error(ErrorsTemplates.NOT_AUTHORIZED)
    }

    const user = session.user as SessionUser

    const body = await readBody(event)

    if (body.content == null) {
      throw new Error(ErrorsTemplates.DATA_NOT_PROVIDED)
    }

    if (body.article == null || isNaN(Number(body.article))) {
      throw new Error(ErrorsTemplates.DATA_NOT_PROVIDED)
    }

    if (body.replyTo != null && isNaN(Number(body.replyTo))) {
      throw new Error(ErrorsTemplates.DATA_NOT_PROVIDED)
    }

    const thread = await threadsService.createThread(body.article, user.xId, body.content, body.replyTo)

    return thread
  } catch (e) {
    return e
  }
})
