import { count } from "drizzle-orm"
import { NewArticle, articles } from "../database/tables/articles"
import { NewUser, users } from "../database/tables/users"
import { XAuthUser } from "../types/XAuthEvent"
import { tables, useDrizzle } from "../utils/drizzle"

class ArticleService {
    async seedArticlesIfNotExist() {
        const articles = await useDrizzle().select().from(tables.articles)

        if (articles.length > 0) throw new Error('ARTICLES_ALREADY_SEEDED')

        const mockArticles: NewArticle[] = [
            {
                slug: 'test',
                name: 'Top Tech Trends of 2024',
                authorId: 1,
                points: 120,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Sun, 22 Dec 2024 20:40:00 GMT'),
            },
            {
                slug: 'healthy-living-tips',
                name: '5 Tips for Healthy Living',
                authorId: 1,
                points: 75,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Mon, 23 Dec 2024 08:30:00 GMT'),
            },
            {
                slug: 'travel-destinations',
                name: 'Top 10 Travel Destinations for 2024',
                authorId: 1,
                points: 95,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Tue, 24 Dec 2024 15:00:00 GMT'),
            },
            {
                slug: 'ai-breakthroughs',
                name: 'AI Breakthroughs of the Year',
                authorId: 1,
                points: 200,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Wed, 25 Dec 2024 10:15:00 GMT'),
            },
            {
                slug: 'coding-tips',
                name: '10 Essential Coding Tips for Beginners',
                authorId: 1,
                points: 85,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Thu, 26 Dec 2024 18:45:00 GMT'),
            },
            {
                slug: 'book-recommendations',
                name: 'Best Books to Read in 2024',
                authorId: 1,
                points: 65,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Fri, 27 Dec 2024 14:20:00 GMT'),
            },
            {
                slug: 'fitness-routines',
                name: 'Effective Fitness Routines for the New Year',
                authorId: 1,
                points: 110,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Sat, 28 Dec 2024 09:00:00 GMT'),
            },
            {
                slug: 'finance-tips',
                name: 'How to Save Money in 2024',
                authorId: 1,
                points: 130,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Sun, 29 Dec 2024 16:35:00 GMT'),
            },
            {
                slug: 'movie-reviews',
                name: 'Top Movies of 2024 Reviewed',
                authorId: 1,
                points: 90,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Mon, 30 Dec 2024 19:50:00 GMT'),
            },
            {
                slug: 'gaming-highlights',
                name: '2024 Gaming Highlights',
                authorId: 1,
                points: 145,
                views: 0,
                content: `# MOCK ARTICLE, NO CONTENT`,
                createdAt: new Date('Tue, 31 Dec 2024 23:00:00 GMT'),
            },
        ];

        await useDrizzle().insert(tables.articles).values(mockArticles).execute()

        return
    }

    async getLatestArticles(take: number, skip: number) {
        const articles = await useDrizzle().query.articles.findMany({
            with: {
                author: true
            },
            limit: take,
            offset: skip
        })

        const response = {
            data: articles,
            hasNextPage: await this.hasNextPage(take, skip)
        }

        return response
    }

    async getArticleById(id: number) {
        const article = await useDrizzle().query.articles.findFirst({
            with: {
                author: true
            },
            where: eq(tables.articles.id, id)
        })

        if (article == null) {
            throw new Error('ARTICLE_NOT_FOUND')
        }

        return article
    }

    async getArticleBySlug(slug: string) {
        const article = await useDrizzle().query.articles.findFirst({
            with: {
                author: true
            },
            where: eq(tables.articles.slug, slug)
        })

        if (article == null) {
            throw new Error('ARTICLE_NOT_FOUND')
        }

        return article
    }

    async upvoteArticle(userXId: string, articleId: number) {
        await useDrizzle().transaction(async (tx) => {
            try {
                const user = await tx.query.users.findFirst({ where: eq(tables.users.twitterId, userXId) })
                if (user == null) throw new Error('USER_NOT_FOUND')

                const [article] = await tx.select().from(tables.articles).where(eq(tables.articles.id, articleId)).for('update')
                if (article == null) throw new Error('ARTICLE_NOT_FOUND')

                const userUpvote = await tx.select().from(tables.upvotes).where(
                    and(
                        eq(tables.upvotes.userId, user.id),
                        eq(tables.upvotes.articleId, articleId)
                    )
                )

                if (userUpvote.length > 0) throw new Error('ALREADY_UPVOTED')

                await tx.insert(tables.upvotes).values({
                    userId: user.id,
                    articleId: articleId
                })

                await tx.update(tables.articles).set({ points: article.points + 1 }).where(eq(tables.articles.id, articleId))

                return
            } catch (e) {
                throw e
            }

        })
    }

    private async hasNextPage(take: number, skip: number) {
        const total = skip + take

        const [{ count: articlesCount }] = await useDrizzle().select({ count: count() }).from(articles)

        if (articlesCount <= total) {
            return false
        }

        return true
    }
}

const articleService = new ArticleService()
export default articleService