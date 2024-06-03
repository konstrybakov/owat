import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

const trackerTypes = ['hiring_platform'] as const
export type TrackerType = (typeof trackerTypes)[number]
export const trackerType = pgEnum('tracker_type', trackerTypes)

const hiringPlatforms = ['greenhouse'] as const
export type HiringPlatform = (typeof hiringPlatforms)[number]
export const hiringPlatform = pgEnum('hiring_platform', hiringPlatforms)

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: text('name').notNull(),
  trackerURL: text('tracker_url').notNull().unique(),
  trackerType: trackerType('tracker_type').notNull(),
  hiringPlatform: hiringPlatform('hiring_platform'),
})

export type SelectCompany = typeof companies.$inferSelect
export type InsertCompany = typeof companies.$inferInsert
