CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"author_id" integer,
	"views" integer DEFAULT 0 NOT NULL,
	"content" text NOT NULL,
	"slug" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
