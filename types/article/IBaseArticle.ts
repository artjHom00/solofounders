import type { IUser } from "../user/IUser";

export interface IBaseArticle {
    name: string | null;
    points: number;
    views: number;
    id: number;
    createdAt: Date;
    authorId: number | null;
    slug: string;
    author: IUser
}
