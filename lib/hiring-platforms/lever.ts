import { queryInsertJobs, queryMarkJobsAsClosed } from '../db/queries'
import type { HiringPlatformName, InsertJob, SelectCompany } from '../db/schema'
import { logger } from '../logger'
import { HiringPlatform } from './base'
import { type LeverJob, LeverWorkplaceType } from './lever/types'

export class Lever extends HiringPlatform {
  allowedHosts = ['jobs.lever.co']

  async checkURL(): Promise<HiringPlatformName> {
    console.log(this.url.host)

    if (!this.allowedHosts.includes(this.url.host)) {
      throw new Error('[Lever] URL Mismatch')
    }

    const response = await fetch(this.getJobBoardAPIURL())

    if (!response.ok) {
      throw new Error('[Lever] Job board not found')
    }

    return 'lever'
  }

  private getCompanyToken(): string {
    return this.url.pathname.split('/')[1]
  }

  private getJobBoardAPIURL(): string {
    console.log(this.getCompanyToken())

    return `https://api.lever.co/v0/postings/${this.getCompanyToken()}`
  }

  async fetchJobs(companyId: SelectCompany['id']): Promise<void> {
    const response = await fetch(this.getJobBoardAPIURL())

    if (!response.ok) {
      throw new Error('[Lever] Job board API not found')
    }

    const jobs = (await response.json()) as LeverJob[]

    logger.debug(`[Ashby][${this.getCompanyToken()}] Found ${jobs.length} jobs`)

    const openJobs = jobs.map(job => this.mapJob(job, companyId))

    if (openJobs.length) {
      await queryInsertJobs(openJobs)
      await queryMarkJobsAsClosed(companyId, openJobs)
    }
  }

  private mapJob(job: LeverJob, companyId: SelectCompany['id']): InsertJob {
    const result = {
      url: job.hostedUrl,
      title: job.text,
      location: this.getLocation(job),
      lastUpdatedAt: new Date(job.createdAt),
      content: job.descriptionPlain,
      departments: [job.categories.team, job.categories.department],
      companyId,
      isRemote: job.workplaceType === LeverWorkplaceType.remote,
      ...this.getSalary(job),
    } satisfies InsertJob

    return result
  }

  private getLocation(job: LeverJob): string {
    if (job.country && job.categories.location) {
      return `${job.categories.location}, ${job.country}`
    }

    return job.categories.location || job.country
  }

  private getSalary(job: LeverJob) {
    const currency = job.salaryRange?.currency ?? null
    const min = job.salaryRange?.min ? String(job.salaryRange.min) : null
    const max = job.salaryRange?.max ? String(job.salaryRange.max) : null
    const interval = job.salaryRange?.interval ?? null

    const result = {
      salaryMin: min,
      salaryMax: max,
      compensationCurrencyCode: currency,
      compensationInterval: interval,
    } satisfies Pick<
      InsertJob,
      | 'salaryMin'
      | 'salaryMax'
      | 'compensationCurrencyCode'
      | 'compensationInterval'
    >

    return result
  }
}
