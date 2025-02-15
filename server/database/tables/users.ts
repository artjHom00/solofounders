import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { articles } from './articles'
import { threads } from './threads'
import { articleUpvotes } from './articleUpvotes'
import { threadUpvotes } from './threadUpvotes'
import { Roles } from '../../../types/user/Roles'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email'),
  name: text('name'),
  handle: text('handle').notNull(),
  twitterId: text('twitter_id').notNull().unique(),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  role: text({ enum: [Roles.USER, Roles.ADMIN] }).notNull().default(Roles.USER)
})

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  threads: many(threads),
  articleUpvotes: many(articleUpvotes),
  threadUpvotes: many(threadUpvotes)
}))

export type NewUser = typeof users.$inferInsert;
