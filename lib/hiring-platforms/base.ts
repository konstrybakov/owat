import type { HiringPlatformName, SelectCompany } from '../db/schema'

export abstract class HiringPlatform {
  constructor(protected url: URL) {}

  abstract allowedHosts: string[]

  abstract checkURL(): Promise<HiringPlatformName>
  abstract fetchJobs(companyId: SelectCompany['id']): Promise<void>
}
