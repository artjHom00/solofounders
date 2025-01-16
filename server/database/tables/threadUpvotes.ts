import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { threads } from './threads'

export const threadUpvotes = pgTable('thread_upvotes', {
  userId: integer('user_id').notNull().references(() => users.id),
  threadId: integer('thread_id').notNull().references(() => threads.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow()
}, t => ({
  pk: primaryKey({ columns: [t.userId, t.threadId] })
}))

export const threadUpvotesRelations = relations(threadUpvotes, ({ one }) => ({
  threads: one(threads, {
    fields: [threadUpvotes.threadId],
    references: [threads.id]
  }),
  user: one(users, {
    fields: [threadUpvotes.userId],
    references: [users.id]
  })
}))

export type NewUser = typeof threadUpvotes.$inferInsert;
