DO $$ BEGIN
 CREATE TYPE "public"."job_status" AS ENUM('open', 'closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "status" "job_status" NOT NULL;