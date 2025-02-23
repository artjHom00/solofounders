import { SessionUser } from '../../../../types/SessionUser'
import articlesStatisticsService from '../../../services/articlesStatistics'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'Authorization')

    if (authHeader == null || authHeader !== `Bearer ${process.env.CRON_API_KEY}`) {
      throw new Error('Unauthorized')
    }

    const session = await getUserSession(event)
    const user = session.user as SessionUser | undefined

    const article = await articlesStatisticsService.upAllArticles()

    return article
  } catch (e) {
    return e
  }
})
