import articleService from '../../services/articles'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'

export default defineEventHandler(async (event) => {
  try {
    const headers = getRequestHeaders(event)
    if(headers['x-api-key'] !== process.env.ADMIN_API_KEY) {
        throw new Error(ErrorsTemplates.NOT_AUTHORIZED)
    }

    const body = await readBody(event)

    if (body.article == null) {
      throw new Error(ErrorsTemplates.DATA_NOT_PROVIDED)
    }

    await articleService.approveArticle(body.article)
  } catch (e) {
    return e
  }
})
