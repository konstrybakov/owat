DROP TABLE "compensations";--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "currency_code" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "compensation_interval" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "compensation_summary" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_min" numeric(10, 3);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary_max" numeric(10, 3);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "equity_min" numeric(10, 3);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "equity_max" numeric(10, 3);