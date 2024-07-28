import { pullCompanyJobs } from '@/lib/actions/pull-company-jobs'
import { querySelectAllCompanies } from '@/lib/db/queries'

import { logger } from '@/lib/logger'
import { waitFor } from '@/lib/utils/wait-for'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { headers } from 'next/headers'

export const GET = async () => {
  const headerList = headers()
  const auth = headerList.get('Authorization')

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json(
      {
        message: ReasonPhrases.UNAUTHORIZED,
      },
      {
        status: StatusCodes.UNAUTHORIZED,
      },
    )
  }

  try {
    logger.info('Processing companies and fetching jobs')

    const companies = await querySelectAllCompanies()

    for (const company of companies) {
      await pullCompanyJobs(company)
    }

    return Response.json(
      {
        message: 'Companies processed',
      },
      {
        status: StatusCodes.OK,
      },
    )
  } catch (error) {
    logger.error(error)

    const message =
      error instanceof Error ? error.message : '[/companies/api] Unknown error'

    // TODO: normalize api return types
    return Response.json(
      {
        message,
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    )
  } finally {
    logger.info('Finished `job-processing` cron job')
    logger.flush()

    // TODO: vercel edge functions finish too quick, before the logger flushes
    await waitFor(1000)
  }
}
