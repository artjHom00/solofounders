import articlesStatisticsService from "../../services/articlesStatistics";

export default defineTask({
    meta: {
        name: "analytics:sync",
        description: "Sync cached analytics with DB",
    },
    async run() {
        try {
            await articlesStatisticsService.syncWithDb()

            return {
                result: 'success',
            }
        } catch (e) {
            // todo add log
            return {
                result: 'fail',
            }
        }
    },
});