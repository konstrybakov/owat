'use server'
import {
  type QueryCreateCompanyResult,
  queryCreateCompany,
} from '@/lib/db/queries'
import type { InsertCompany } from '@/lib/db/schema'
import { logger } from '@/lib/logger'
import type { ActionResponse } from '@/lib/types/api'

export const actionCreateCompany = async (
  company: InsertCompany,
): Promise<ActionResponse<Awaited<QueryCreateCompanyResult>>> => {
  try {
    const result = await queryCreateCompany(company)

    logger.debug(result)

    return {
      error: false,
      data: result,
    }
  } catch (error) {
    logger.error(error)

    const errorMessage =
      error instanceof Error
        ? error.message
        : '[Action][CreateCompany] Unknown error'

    return { error: true, errorMessage }
  }
}
