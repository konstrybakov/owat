// TODO: split this file

import { and, eq, notInArray, sql } from 'drizzle-orm'
import { logger } from '../logger'
import { db } from './db'
import { type InsertCompany, type InsertJob, companies, jobs } from './schema'

export const queryCreateCompany = async (company: InsertCompany) => {
  const result = await db
    .insert(companies)
    .values(company)
    .returning({ id: companies.id })

  return result
}

export type QueryCreateCompanyResult = ReturnType<typeof queryCreateCompany>

export const querySelectAllCompanies = async () => {
  const result = await db.select().from(companies)

  return result
}

export type QuerySelectAllCompaniesResult = ReturnType<
  typeof querySelectAllCompanies
>

export const querySelectCompanyByTrackerURL = async (trackerURL: string) => {
  const result = await db
    .select({ id: companies.id })
    .from(companies)
    .where(eq(companies.trackerURL, trackerURL))

  return result
}

export type QuerySelectCompanyByTrackerURLResult = ReturnType<
  typeof querySelectCompanyByTrackerURL
>

export const querySelectCompany = async (id: number) => {
  const result = await db.select().from(companies).where(eq(companies.id, id))

  return result
}

export type QuerySelectCompanyResult = ReturnType<typeof querySelectCompany>

export const queryInsertJobs = async (jobList: InsertJob[]) => {
  const result = await db
    .insert(jobs)
    .values(jobList)
    .onConflictDoUpdate({
      target: jobs.url,
      setWhere: sql`jobs.last_updated_at < excluded.last_updated_at`,
      set: {
        title: sql`excluded.title`,
        location: sql`excluded.location`,
        lastUpdatedAt: sql`excluded.last_updated_at`,
        content: sql`excluded.content`,
        departments: sql`excluded.departments`,
        status: 'open',
      },
    })

  return result
}

export type QueryInsertJobsResult = ReturnType<typeof queryInsertJobs>

export const queryGetJobs = async () => {
  const result = await db.query.jobs.findMany({
    with: {
      company: true,
    },
  })

  return result
}

export type QueryGetJobsResult = ReturnType<typeof queryGetJobs>

export const queryMarkJobsAsClosed = async (
  companyId: number,
  openJobs: InsertJob[],
) => {
  logger.debug(openJobs.map(({ url }) => url))

  const result = await db
    .update(jobs)
    .set({ status: 'closed' })
    .where(
      and(
        eq(jobs.companyId, companyId),
        notInArray(
          jobs.url,
          openJobs.map(({ url }) => url),
        ),
      ),
    )

  return result
}
