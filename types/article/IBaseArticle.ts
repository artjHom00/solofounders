export interface IBaseArticle {
    name: string | null;
    points: number;
    views: number;
    id: number;
    createdAt: string;
    authorId: number | null;
    slug: string;
    author: {
        name: string | null;
        id: number;
        email: string | null;
        handle: string;
        twitterId: string;
        avatar: string | null;
    } | null;
}
