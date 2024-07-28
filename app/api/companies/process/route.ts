import { querySelectAllCompanies } from '@/lib/db/queries'
import type { SelectCompany } from '@/lib/db/schema'
import { createPlatform } from '@/lib/hiring-platforms/registry'

import { logger } from '@/lib/logger'
import type { NonNullableProperty } from '@/lib/types/utils'
import { waitFor } from '@/lib/utils/wait-for'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { headers } from 'next/headers'

// TODO: Express this through type also, on a lower level
const isHiringPlatform = (
  company: SelectCompany,
): company is NonNullableProperty<SelectCompany, 'hiringPlatform'> =>
  company.trackerType === 'hiring_platform'

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
      const start = performance.now()

      logger.info(`Processing company ${company.name}`)

      if (isHiringPlatform(company)) {
        const platform = createPlatform(
          company.hiringPlatform,
          new URL(company.trackerURL),
        )

        await platform.fetchJobs(company.id)
      }

      const end = performance.now()

      logger.info(
        `Company ${company.name} processed in ${(end - start) / 1000}s`,
      )
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
