import type { IBaseArticle } from '../article/IBaseArticle'

export interface ILatestArticlesResponse {
    data: IBaseArticle[],
    hasNextPage: boolean
}
