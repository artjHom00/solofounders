import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { articles } from './articles'

export const upvotes = pgTable('users_upvotes', {
  userId: integer('user_id').notNull().references(() => users.id),
  articleId: integer('article_id').notNull().references(() => articles.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow()
}, t => ({
  pk: primaryKey({ columns: [t.userId, t.articleId] })
}))

export const upvotesRelations = relations(upvotes, ({ one }) => ({
  articles: one(articles, {
    fields: [upvotes.articleId],
    references: [articles.id]
  }),
  user: one(users, {
    fields: [upvotes.userId],
    references: [users.id]
  })
}))

export type NewUser = typeof upvotes.$inferInsert;
