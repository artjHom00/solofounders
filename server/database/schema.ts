import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull().unique(),
  handle: text('name').notNull(),
  twitterId: text('twitter_id').notNull().unique(),
  twitterSecret: text('password').notNull(),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').notNull(),
})