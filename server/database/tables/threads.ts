import { relations } from 'drizzle-orm'
import { AnyPgColumn, integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { articles } from './articles'
import { threadUpvotes } from './threadUpvotes'

export const threads = pgTable('threads', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  articleId: integer('article_id').notNull().references(() => articles.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  points: integer('points').notNull().default(0),
  replyTo: integer('reply_to').references((): AnyPgColumn => threads.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const threadsRelations = relations(threads, ({ one, many }) => ({
  article: one(articles, {
    fields: [threads.articleId],
    references: [articles.id]
  }),
  user: one(users, {
    fields: [threads.userId],
    references: [users.id]
  }),
  upvotes: many(threadUpvotes)
}))

export type NewUser = typeof threads.$inferInsert;
