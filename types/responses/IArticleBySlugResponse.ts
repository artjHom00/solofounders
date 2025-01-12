import type { IArticle } from '../article/IArticle'

export interface IArticleBySlugResponse {
    data: IArticle,
    isAuthor: boolean,
    hasUpvoted: boolean
}
