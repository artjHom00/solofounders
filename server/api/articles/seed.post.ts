import { IBaseArticle } from "~/types/article/IBaseArticle";
import { NewArticle } from "../../database/tables/articles";
import articleService from "../../services/articles";

export default defineEventHandler(async (event) => {
    try {
        await articleService.seedArticlesIfNotExist()
        return
    } catch(e) {
        return e
    }
})