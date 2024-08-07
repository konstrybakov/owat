import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  json,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

const trackerTypes = ['hiring_platform'] as const
export type TrackerType = (typeof trackerTypes)[number]
export const trackerType = pgEnum('tracker_type', trackerTypes)

const hiringPlatforms = ['greenhouse', 'ashby', 'lever'] as const
export type HiringPlatformName = (typeof hiringPlatforms)[number]
export const hiringPlatform = pgEnum('hiring_platform', hiringPlatforms)

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text('name').notNull(),
  trackerURL: text('tracker_url').notNull().unique(),
  trackerType: trackerType('tracker_type').notNull(),
  hiringPlatform: hiringPlatform('hiring_platform'),
})

export type SelectCompany = typeof companies.$inferSelect
export type InsertCompany = typeof companies.$inferInsert

export const companiesRelations = relations(companies, ({ many }) => ({
  jobs: many(jobs),
}))

const jobStatuses = ['open', 'closed'] as const
export type JobStatus = (typeof jobStatuses)[number]
export const jobStatus = pgEnum('job_status', jobStatuses)

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  url: text('url').notNull().unique(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  lastUpdatedAt: timestamp('last_updated_at').notNull(),
  content: text('content').notNull(),
  departments: json('departments').$type<string[]>().notNull(),
  status: jobStatus('status').notNull().default('open'),
  companyId: integer('company_id')
    .notNull()
    .references(() => companies.id, { onDelete: 'cascade' }),
  isSeen: boolean('is_seen').notNull().default(false),
  isHidden: boolean('is_hidden').notNull().default(false),
  isTopChoice: boolean('is_top_choice').notNull().default(false),
  isApplied: boolean('is_applied').notNull().default(false),
  isRemote: boolean('is_remote'),
  compensationCurrencyCode: text('currency_code'),
  compensationInterval: text('compensation_interval'),
  compensationSummary: text('compensation_summary'),
  salaryMin: numeric('salary_min', { precision: 10, scale: 3 }),
  salaryMax: numeric('salary_max', { precision: 10, scale: 3 }),
  equityMin: numeric('equity_min', { precision: 10, scale: 3 }),
  equityMax: numeric('equity_max', { precision: 10, scale: 3 }),
})

export type SelectJob = typeof jobs.$inferSelect
export type InsertJob = typeof jobs.$inferInsert

export const jobsRelations = relations(jobs, ({ one }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
}))
