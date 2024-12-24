import { IBaseArticle } from "~/types/article/IBaseArticle";

// here put the logic to check whether the account is created already or not
export default defineEventHandler(async (event) => {
    try {
        const articles: IBaseArticle[] = [
            {
                url: '/articles/test',
                name: 'Top Tech Trends of 2024',
                author: 'techGuru',
                date: 'Sun, 22 Dec 2024 20:40:00 GMT',
                points: 120,
                views: 0
            },
            {
                url: '/healthy-living-tips',
                name: '5 Tips for Healthy Living',
                author: 'wellnessExpert',
                date: 'Mon, 23 Dec 2024 08:30:00 GMT',
                points: 75,
                views: 0
            },
            {
                url: '/travel-destinations',
                name: 'Top 10 Travel Destinations for 2024',
                author: 'globeTrotter',
                date: 'Tue, 24 Dec 2024 15:00:00 GMT',
                points: 95,
                views: 0
            },
            {
                url: '/ai-breakthroughs',
                name: 'AI Breakthroughs of the Year',
                author: 'aiWizard',
                date: 'Wed, 25 Dec 2024 10:15:00 GMT',
                points: 200,
                views: 0
            },
            {
                url: '/coding-tips',
                name: '10 Essential Coding Tips for Beginners',
                author: 'devMaster',
                date: 'Thu, 26 Dec 2024 18:45:00 GMT',
                points: 85,
                views: 0
            },
            {
                url: '/book-recommendations',
                name: 'Best Books to Read in 2024',
                author: 'bookLover',
                date: 'Fri, 27 Dec 2024 14:20:00 GMT',
                points: 65,
                views: 0
            },
            {
                url: '/fitness-routines',
                name: 'Effective Fitness Routines for the New Year',
                author: 'fitPro',
                date: 'Sat, 28 Dec 2024 09:00:00 GMT',
                points: 110,
                views: 0
            },
            {
                url: '/finance-tips',
                name: 'How to Save Money in 2024',
                author: 'financeGuru',
                date: 'Sun, 29 Dec 2024 16:35:00 GMT',
                points: 130,
                views: 0
            },
            {
                url: '/movie-reviews',
                name: 'Top Movies of 2024 Reviewed',
                author: 'cinephile',
                date: 'Mon, 30 Dec 2024 19:50:00 GMT',
                points: 90,
                views: 0
            },
            {
                url: '/gaming-highlights',
                name: '2024 Gaming Highlights',
                author: 'gameChaser',
                date: 'Tue, 31 Dec 2024 23:00:00 GMT',
                points: 145,
                views: 0
            },
        ];

        return articles;
    } catch (e: any) {
        return setResponseStatus(event, 500, e.message || 'Internal Server Error')
    }
})