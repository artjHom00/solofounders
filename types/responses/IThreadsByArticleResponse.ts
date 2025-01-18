export interface IThreadsByArticleResponse {
    id: number,
    userId: number,
    articleId: number,
    content: string,
    points: number,
    createdAt: string,
    replyTo: number | null,
    hasUpvoted: boolean,
    isAuthor: boolean,
}