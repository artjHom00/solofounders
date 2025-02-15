import type { IArticle } from '../article/IArticle'

export interface IArticleBySlugResponse {
    data: IArticle,
    isAvailable: boolean,
    isAuthor: boolean,
    hasUpvoted: boolean
}
