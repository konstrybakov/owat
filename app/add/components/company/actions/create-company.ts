'use server'
import { pullCompanyJobs } from '@/lib/actions/pull-company-jobs'
import {
  type QueryCreateCompanyResult,
  queryCreateCompany,
} from '@/lib/db/queries'
import type { InsertCompany } from '@/lib/db/schema'
import { logger } from '@/lib/logger'
import type { ActionResponse } from '@/lib/types/api'

export const actionCreateCompany = async (
  company: InsertCompany,
): Promise<ActionResponse<Awaited<QueryCreateCompanyResult>[number]>> => {
  try {
    const [companyEntry] = await queryCreateCompany(company)

    logger.debug({ companyEntry }, 'Company created')

    await pullCompanyJobs(companyEntry)

    return {
      error: false,
      data: companyEntry,
    }
  } catch (error) {
    logger.error(error, 'Error while creating company')

    const errorMessage =
      error instanceof Error
        ? error.message
        : '[Action][CreateCompany] Unknown error'

    return { error: true, errorMessage }
  }
}
