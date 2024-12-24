CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"twitter_id" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_twitter_id_unique" UNIQUE("twitter_id")
);
