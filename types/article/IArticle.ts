import type { IBaseThread } from '../thread/IBaseThread';
import type { IBaseArticle } from './IBaseArticle'

export interface IArticle extends IBaseArticle {
    content: string;
    threads: IBaseThread[]
}
