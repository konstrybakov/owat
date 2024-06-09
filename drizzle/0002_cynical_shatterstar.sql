CREATE TABLE IF NOT EXISTS "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"last_updated_at" timestamp NOT NULL,
	"content" text NOT NULL,
	"departments" json NOT NULL,
	CONSTRAINT "jobs_url_unique" UNIQUE("url")
);
