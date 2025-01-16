import { NewArticle } from '../database/tables/articles'

export const mockArticles: NewArticle[] = [
  {
    slug: 'test',
    name: 'Top Tech Trends of 2024',
    authorId: 1,
    points: 120,
    views: 0,
    content: `## Top Tech Trends of 2024
As technology continues to evolve, 2024 is shaping up to be an exciting year. 
This article covers the latest advancements in AI, blockchain, 5G networks, 
and emerging trends in virtual reality and metaverse platforms. Stay ahead 
of the curve by understanding how these trends will shape our future.`,
    createdAt: new Date('Sun, 22 Dec 2024 20:40:00 GMT')
  },
  {
    slug: 'healthy-living-tips',
    name: '5 Tips for Healthy Living',
    authorId: 1,
    points: 75,
    views: 0,
    content: `## 5 Tips for Healthy Living
Start 2024 on the right foot with these practical and easy-to-follow health tips. 
Learn how to balance your diet, stay active, manage stress, improve sleep quality, 
and maintain a positive mindset. Small changes can lead to a healthier and happier you!
      `,
    createdAt: new Date('Mon, 23 Dec 2024 08:30:00 GMT')
  },
  {
    slug: 'travel-destinations',
    name: 'Top 10 Travel Destinations for 2024',
    authorId: 1,
    points: 95,
    views: 0,
    content: `## Top 10 Travel Destinations for 2024
Ready to pack your bags? Discover the most breathtaking places to visit this year, 
from serene tropical beaches to bustling metropolitan cities. Whether you're a thrill-seeker 
or a culture enthusiast, there's something for everyone on this list.
      `,
    createdAt: new Date('Tue, 24 Dec 2024 15:00:00 GMT')
  },
  {
    slug: 'ai-breakthroughs',
    name: 'AI Breakthroughs of the Year',
    authorId: 1,
    points: 200,
    views: 0,
    content: `## AI Breakthroughs of the Year
Explore the most groundbreaking advancements in artificial intelligence in 2024. 
This article highlights new AI tools, research innovations, and their real-world applications 
in healthcare, finance, and more. The future is smarter than ever!
      `,
    createdAt: new Date('Wed, 25 Dec 2024 10:15:00 GMT')
  },
  {
    slug: 'coding-tips',
    name: '10 Essential Coding Tips for Beginners',
    authorId: 1,
    points: 85,
    views: 0,
    content: `## 10 Essential Coding Tips for Beginners
Learning to code can be challenging, but these 10 tips will help you stay on track. 
From choosing the right programming language to practicing problem-solving, 
this guide is your roadmap to becoming a proficient coder in 2024.
      `,
    createdAt: new Date('Thu, 26 Dec 2024 18:45:00 GMT')
  },
  {
    slug: 'book-recommendations',
    name: 'Best Books to Read in 2024',
    authorId: 1,
    points: 65,
    views: 0,
    content: `## Best Books to Read in 2024
Expand your horizons with this curated list of must-read books. Whether you're 
into fiction, self-help, or historical accounts, these titles are sure to inspire, 
entertain, and educate you throughout the year.
      `,
    createdAt: new Date('Fri, 27 Dec 2024 14:20:00 GMT')
  },
  {
    slug: 'fitness-routines',
    name: 'Effective Fitness Routines for the New Year',
    authorId: 1,
    points: 110,
    views: 0,
    content: `## Effective Fitness Routines for the New Year
Kickstart your fitness journey with these effective workout routines tailored 
for beginners and fitness enthusiasts alike. Includes tips on strength training, 
cardio, and flexibility exercises to help you achieve your goals.
      `,
    createdAt: new Date('Sat, 28 Dec 2024 09:00:00 GMT')
  },
  {
    slug: 'finance-tips',
    name: 'How to Save Money in 2024',
    authorId: 1,
    points: 130,
    views: 0,
    content: `## How to Save Money in 2024
Learn practical and actionable strategies to improve your finances this year. 
From budgeting and smart investments to avoiding common money traps, 
this article helps you pave the way for financial success.
      `,
    createdAt: new Date('Sun, 29 Dec 2024 16:35:00 GMT')
  },
  {
    slug: 'movie-reviews',
    name: 'Top Movies of 2024 Reviewed',
    authorId: 1,
    points: 90,
    views: 0,
    content: `## Top Movies of 2024 Reviewed
Cinema lovers, rejoice! This article reviews the best movies of 2024, 
covering everything from blockbuster hits to indie gems. Discover the must-watch 
films of the year and why they captured audiences worldwide.
      `,
    createdAt: new Date('Mon, 30 Dec 2024 19:50:00 GMT')
  },
  {
    slug: 'gaming-highlights',
    name: '2024 Gaming Highlights',
    authorId: 1,
    points: 145,
    views: 0,
    content: `## 2024 Gaming Highlights
Dive into the world of gaming with the most exciting highlights of 2024. 
From groundbreaking game releases to advancements in gaming technology, 
this article has all the details that every gamer needs to know.
      `,
    createdAt: new Date('Tue, 31 Dec 2024 23:00:00 GMT')
  }
]
