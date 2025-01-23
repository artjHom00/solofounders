import type { IThreadExtended } from '../thread/IThreadExtended'
import type { IBaseArticle } from './IBaseArticle'

export interface IArticle extends IBaseArticle {
    content: string;
}
