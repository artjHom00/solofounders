ALTER TABLE "users_upvotes" DROP CONSTRAINT "users_upvotes_article_id_articles_id_fk";
--> statement-breakpoint
ALTER TABLE "users_upvotes" ADD CONSTRAINT "users_upvotes_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;