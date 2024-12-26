import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const articles = pgTable('articles', {
    id: serial('id').primaryKey(),
    name: text('email'),
    authorId: integer('author_id'),
    views: integer('views').notNull().default(0),
    content: text('content').notNull(),
    slug: text('slug').notNull(),
    points: integer('points').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const articlesRelations = relations(articles, ({ one }) => ({
    author: one(users, {
        fields: [articles.authorId],
        references: [users.id],
    }),
}));

export type NewArticle = typeof articles.$inferInsert;
