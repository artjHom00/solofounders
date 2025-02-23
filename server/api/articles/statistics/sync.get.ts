import articlesStatisticsService from '../../../services/articlesStatistics'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'Authorization')

    if (authHeader == null || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      throw new Error('Unauthorized')
    }

    await articlesStatisticsService.syncWithDb()
  } catch (e) {
    return e
  }
})
