import articleService from '../../services/articles'
import { SessionUser } from '../../../types/SessionUser'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)

    if (session.user == null) {
      throw new Error(ErrorsTemplates.NOT_AUTHORIZED)
    }

    const user = session.user as SessionUser

    const body = await readBody(event)

    if (body.article == null) {
      throw new Error(ErrorsTemplates.DATA_NOT_PROVIDED)
    }

    await articleService.upvoteArticle(user.xId, body.article)
  } catch (e) {
    return e
  }
})
