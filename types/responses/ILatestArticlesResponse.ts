import type { IBaseArticle } from "../article/IBaseArticle";

export interface LatestArticlesResponse {
    data: IBaseArticle[],
    hasNextPage: boolean
}