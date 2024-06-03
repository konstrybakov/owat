import { eq } from 'drizzle-orm'
import { db } from './db'
import { type InsertCompany, companies } from './schema'

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
