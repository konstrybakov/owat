DO $$ BEGIN
 CREATE TYPE "public"."compensation_type" AS ENUM('salary', 'equity');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "compensations" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"job_id" integer NOT NULL,
	"type" "compensation_type" NOT NULL,
	"currency_code" text,
	"min_value" numeric(10, 3) NOT NULL,
	"max_value" numeric(10, 3),
	"summary" text,
	"interval" text
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "is_remote" boolean;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "compensations" ADD CONSTRAINT "compensations_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
