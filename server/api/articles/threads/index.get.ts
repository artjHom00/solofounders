import { byIdSchema } from '../../../validation/byId'
import { SessionUser } from '../../../../types/SessionUser'
import threadsService from '../../../services/threads'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)
    const user = session.user as SessionUser | undefined

    const query = await getValidatedQuery(event, byIdSchema.parse)
    const threads = await threadsService.getThreadsByArticleId(query.id, user?.xId)

    return threads
  } catch (e) {
    return e
  }
})
