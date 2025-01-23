import type { IBaseUser } from '../user/IBaseUser'

export interface IBaseThread {
    id: number,
    userId: number,
    articleId: number,
    content: string,
    points: number,
    createdAt: string | Date,
    replyTo: number | null,
}
