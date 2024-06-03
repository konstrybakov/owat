DO $$ BEGIN
 CREATE TYPE "public"."hiring_platform" AS ENUM('greenhouse');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."tracker_type" AS ENUM('hiring_platform');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"tracker_url" text NOT NULL,
	"tracker_type" "tracker_type" NOT NULL,
	"hiring_platform" "hiring_platform"
);
