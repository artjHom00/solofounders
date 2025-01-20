import { SessionUser } from '../../../../types/SessionUser'
import articlesStatisticsService from '../../../services/articlesStatistics'
import { IArticle } from '~/types/article/IArticle'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'Authorization')

    if (authHeader == null || authHeader !== `Bearer ${process.env.CRON_API_KEY}`) {
      throw new Error('Unauthorized')
    }

    await articlesStatisticsService.syncWithDb()
  } catch (e) {
    return e
  }
})
