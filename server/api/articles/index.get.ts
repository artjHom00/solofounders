import { IArticle } from "~/types/article/IArticle"
import articleService from "../../services/articles"
import { byIdSchema } from "../../validation/byId";
import { bySlugSchema } from "../../validation/bySlug";

export default defineEventHandler(async (event) => {
    try {
        const query = await getValidatedQuery(event, bySlugSchema.parse);
    
        const article = await articleService.getArticleBySlug(query.slug)
    
        return article
    } catch(e) {
        return e
    }
})