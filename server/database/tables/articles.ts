import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'
import { upvotes } from './upvotes'

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  name: text('email'),
  authorId: integer('author_id'),
  views: integer('views').notNull().default(0),
  content: text('content').notNull(),
  slug: text('slug').notNull(),
  points: integer('points').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id]
  }),
  upvotes: many(upvotes)
}))

export type NewArticle = typeof articles.$inferInsert;
