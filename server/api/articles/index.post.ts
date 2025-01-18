import { ErrorsTemplates } from '~/utils/ErrorsTemplates'
import articleService from '../../services/articles'
import { SessionUser } from '../../types/SessionUser'

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

    if (body.name == null || body.name === '') {
      throw new Error(ErrorsTemplates.DATA_NOT_PROVIDED)
    }

    const createdUrl = await articleService.createArticle(user.xId, body.name, body.content)
    return createdUrl
  } catch (e) {
    return e
  }
})
