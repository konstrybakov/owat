import type { HiringPlatformName, SelectCompany } from '../db/schema'

export abstract class HiringPlatform {
  constructor(protected url: URL) {}

  abstract checkURL(): Promise<HiringPlatformName>
  abstract fetchJobs(companyId: SelectCompany['id']): Promise<void>
}
