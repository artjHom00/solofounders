import articlesStatisticsService from '../../services/articlesStatistics'
import { logger } from '../../utils/winston'

export default defineTask({
  meta: {
    name: 'analytics:up',
    description: 'Up analytics to articles'
  },
  async run () {
    try {

      logger.info({
        topic: 'analytics:up',
        msg: "starting"
      });

      await articlesStatisticsService.upAllArticles()

      logger.info({
        topic: 'analytics:up',
        msg: "done"
      });
      
      return {
        result: 'success'
      }
    } catch (e) {
      logger.error({
        topic: 'analytics:up',
        msg: e
      })
      return {
        result: 'fail'
      }
    }
  }
})
