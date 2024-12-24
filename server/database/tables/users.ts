import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email'),
    name: text('name'),
    handle: text('handle').notNull(),
    twitterId: text('twitter_id').notNull().unique(),
    avatar: text('avatar'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  })

export type NewUser = typeof users.$inferInsert;
