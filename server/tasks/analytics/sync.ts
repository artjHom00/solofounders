import articlesStatisticsService from '../../services/articlesStatistics'
import { logger } from '../../utils/winston'

export default defineTask({
  meta: {
    name: 'analytics:sync',
    description: 'Sync cached analytics with DB'
  },
  async run () {
    try {
      logger.info({
        topic: 'analytics:sync',
        msg: "starting"
      });

      await articlesStatisticsService.syncWithDb()

      logger.info({
        topic: 'analytics:sync',
        msg: "done"
      });
      return {
        result: 'success'
      }
    } catch (e) {
      logger.error({
        topic: 'analytics:sync',
        msg: e
      })
      return {
        result: 'fail'
      }
    }
  }
})
