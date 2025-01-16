CREATE TABLE "thread_upvotes" (
	"user_id" integer NOT NULL,
	"thread_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "thread_upvotes_user_id_thread_id_pk" PRIMARY KEY("user_id","thread_id")
);
--> statement-breakpoint
CREATE TABLE "threads" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"article_id" integer NOT NULL,
	"content" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"reply_to" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_upvotes" RENAME TO "article_upvotes";--> statement-breakpoint
ALTER TABLE "article_upvotes" DROP CONSTRAINT "users_upvotes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "article_upvotes" DROP CONSTRAINT "users_upvotes_article_id_articles_id_fk";
--> statement-breakpoint
ALTER TABLE "article_upvotes" DROP CONSTRAINT "users_upvotes_user_id_article_id_pk";--> statement-breakpoint
ALTER TABLE "article_upvotes" ADD CONSTRAINT "article_upvotes_user_id_article_id_pk" PRIMARY KEY("user_id","article_id");--> statement-breakpoint
ALTER TABLE "thread_upvotes" ADD CONSTRAINT "thread_upvotes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "thread_upvotes" ADD CONSTRAINT "thread_upvotes_thread_id_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "threads" ADD CONSTRAINT "threads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "threads" ADD CONSTRAINT "threads_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "threads" ADD CONSTRAINT "threads_reply_to_threads_id_fk" FOREIGN KEY ("reply_to") REFERENCES "public"."threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_upvotes" ADD CONSTRAINT "article_upvotes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_upvotes" ADD CONSTRAINT "article_upvotes_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;