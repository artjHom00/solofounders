import articlesStatisticsService from '../../services/articlesStatistics'

export default defineTask({
  meta: {
    name: 'analytics:up',
    description: 'Up analytics to articles'
  },
  async run () {
    try {
      await articlesStatisticsService.upAllArticles()

      return {
        result: 'success'
      }
    } catch (e) {
      // todo add log
      return {
        result: 'fail'
      }
    }
  }
})
