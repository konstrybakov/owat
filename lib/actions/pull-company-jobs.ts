import type { SelectCompany } from '../db/schema'
import { createPlatform } from '../hiring-platforms/registry'
import { logger } from '../logger'
import type { NonNullableProperty } from '../types/utils'

// TODO: Express this through type also, on a lower level
const isHiringPlatform = (
  company: SelectCompany,
): company is NonNullableProperty<SelectCompany, 'hiringPlatform'> =>
  company.trackerType === 'hiring_platform'

export const pullCompanyJobs = async (company: SelectCompany) => {
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

  logger.info(`Company ${company.name} processed in ${(end - start) / 1000}s`)
}
