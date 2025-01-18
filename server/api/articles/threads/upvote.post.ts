import { ErrorsTemplates } from '~/utils/ErrorsTemplates'
import threadsService from '../../../services/threads'
import { SessionUser } from '../../../types/SessionUser'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)

    if (session.user == null) {
      throw new Error(ErrorsTemplates.NOT_AUTHORIZED)
    }

    const user = session.user as SessionUser

    const body = await readBody(event)

    if (body.thread == null) {
      throw new Error(ErrorsTemplates.DATA_NOT_PROVIDED)
    }

    await threadsService.upvoteThread(user.xId, body.thread)
  } catch (e) {
    return e
  }
})
