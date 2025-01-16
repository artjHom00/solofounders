import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { articles } from './articles'

export const articleUpvotes = pgTable('article_upvotes', {
  userId: integer('user_id').notNull().references(() => users.id),
  articleId: integer('article_id').notNull().references(() => articles.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow()
}, t => ({
  pk: primaryKey({ columns: [t.userId, t.articleId] })
}))

export const articleUpvotesRelations = relations(articleUpvotes, ({ one }) => ({
  articles: one(articles, {
    fields: [articleUpvotes.articleId],
    references: [articles.id]
  }),
  user: one(users, {
    fields: [articleUpvotes.userId],
    references: [users.id]
  })
}))

export type NewUser = typeof articleUpvotes.$inferInsert;
