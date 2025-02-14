import { randomInt } from 'crypto'
import { desc } from 'drizzle-orm'
import { tables, useDrizzle } from '../utils/drizzle'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'

class ArticlesStatisticsService {
  // public articlesIdsLeaderboardSnapshot: number[] = []

  private _articlesStatisticsToUpdate: Record<number, { views: number, points: number }> = {}

  async upAllArticles () {
    const articles = await useDrizzle().query.articles.findMany()

    for (const article of articles) {
      await this.addArticleToCacheObjectIfNotExists(article.id)

      const articleStatistics = this._articlesStatisticsToUpdate[article.id]

      articleStatistics.views += this.getWeightedRandom(articleStatistics.views)
      articleStatistics.points += Math.max(1, Math.floor(articleStatistics.views / 10))
    }
  }

  async syncWithDb () {
    for (const articleId of Object.keys(this._articlesStatisticsToUpdate)) {
      const article = await useDrizzle().query.articles.findFirst({
        where: eq(tables.articles.id, Number(articleId))
      })

      if (article == null) {
        throw new Error(ErrorsTemplates.ARTICLE_NOT_FOUND)
      }

      const { views, points } = this._articlesStatisticsToUpdate[Number(articleId)]


      await useDrizzle().update(tables.articles).set({ views: article.views + views, points: article.points + points }).where(eq(tables.articles.id, Number(articleId)))
    }

    this.clearArticleStatisticsToUpdateObject()
  }

  // async updateArticlesLeaderboardSnapshot() {
  //     const articles = await useDrizzle().query.articles.findMany({
  //         limit: 10,
  //         orderBy: [desc(tables.articles.points)]
  //     })

  //     this.articlesIdsLeaderboardSnapshot = articles.map(article => article.id)
  // }

  async addView (articleId: number) {
    await this.addArticleToCacheObjectIfNotExists(articleId)

    this._articlesStatisticsToUpdate[articleId].views += 1
  }

  private async addArticleToCacheObjectIfNotExists (articleId: number) {
    if (this._articlesStatisticsToUpdate[articleId] == null) {
      const article = await useDrizzle().query.articles.findFirst({
        where: eq(tables.articles.id, articleId)
      })

      if (article == null) {
        throw new Error(ErrorsTemplates.ARTICLE_NOT_FOUND)
      }

      this._articlesStatisticsToUpdate[articleId] = {
        views: 0,
        points: 0
      }
    }
  }

  private clearArticleStatisticsToUpdateObject () {
    this._articlesStatisticsToUpdate = {}
  }

  /**
     * Generate a weighted random value based on the current value.
     * Higher current values result in slightly higher random increments.
     */
  private getWeightedRandom (currentValue: number): number {
    const base = randomInt(1, 100)

    // Add an additional increment based on the current value (scaled down to avoid excessive changes)
    const weightedBonus = Math.floor(currentValue * 0.05) // 5% of the current value

    // Cap the result to prevent excessively large adjustments
    return Math.min(base + weightedBonus, 50)
  }
}

const articlesStatisticsService = new ArticlesStatisticsService()
export default articlesStatisticsService
