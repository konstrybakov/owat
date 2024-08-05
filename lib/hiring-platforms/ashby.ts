import { queryInsertJobs, queryMarkJobsAsClosed } from '../db/queries'
import type { HiringPlatformName, InsertJob, SelectCompany } from '../db/schema'
import { logger } from '../logger'
import { HiringPlatform } from './base'

type AshbyJob = {
  id: string
  title: string
  department: string
  location: string
  publishedAt: string
  isRemote: boolean
  jobUrl: string
  descriptionPlain: string
  compensation?: {
    compensationTierSummary: string
    scrapeableCompensationSalarySummary: string
    compensationTiers: Array<{
      tierSummary: string
      components: Array<
        | {
            summary: string
            compensationType: 'Salary'
            interval: string
            currencyCode: string
            minValue: number
            maxValue: number
          }
        | {
            summary: string
            compensationType: 'EquityPercentage'
            interval: string
            currencyCode: null
            minValue: number
            maxValue: number
          }
      >
    }>
    summaryComponents: Array<
      | {
          compensationType: 'Salary'
          currencyCode: string
          interval: string
          minValue: number
          maxValue: number
        }
      | {
          compensationType: 'EquityPercentage'
          currencyCode: null
          minValue: number
          maxValue: number
        }
    >
  }
}

export class Ashby extends HiringPlatform {
  allowedHosts = ['jobs.ashbyhq.com']

  async checkURL(): Promise<HiringPlatformName> {
    if (!this.allowedHosts.includes(this.url.host)) {
      throw new Error('[Ashby] URL mismatch')
    }

    const response = await fetch(this.getJobBoardURL())

    if (!response.ok) {
      throw new Error('[Ashby] Job board not found')
    }

    return 'ashby'
  }

  private getCompanyToken(): string {
    return this.url.pathname.split('/')[1]
  }

  private getJobBoardURL(): string {
    return `https://jobs.ashbyhq.com/${this.getCompanyToken()}`
  }

  private getJobBoardAPIURL(): string {
    return `https://api.ashbyhq.com/posting-api/job-board/${this.getCompanyToken()}?includeCompensation=true`
  }

  async fetchJobs(companyId: SelectCompany['id']): Promise<void> {
    const response = await fetch(this.getJobBoardAPIURL())

    if (!response.ok) {
      throw new Error('[Ashby] Job board API not found')
    }

    const result = (await response.json()) as { jobs: AshbyJob[] }

    logger.debug(
      `[Ashby][${this.getCompanyToken()}] Found ${result.jobs.length} jobs`,
    )

    const openJobs = result.jobs.map(job => this.mapJob(job, companyId))

    if (openJobs.length) {
      await queryInsertJobs(openJobs)
      await queryMarkJobsAsClosed(companyId, openJobs)
    }
  }

  private mapJob(job: AshbyJob, companyId: SelectCompany['id']): InsertJob {
    const result: InsertJob = {
      url: job.jobUrl,
      title: job.title,
      location: job.location,
      lastUpdatedAt: new Date(job.publishedAt),
      content: job.descriptionPlain,
      departments: [job.department],
      companyId,
      isRemote: job.isRemote,
    }

    if (job.compensation) {
      // TODO: what happens if there are more tiers
      const [compensationTier] = job.compensation.compensationTiers

      result.compensationSummary = job.compensation.compensationTierSummary

      if (compensationTier) {
        const salaryComponent = compensationTier.components.find(
          component => component.compensationType === 'Salary',
        )

        if (salaryComponent) {
          result.salaryMin =
            typeof salaryComponent.minValue === 'number'
              ? String(salaryComponent.minValue)
              : null

          result.salaryMax =
            typeof salaryComponent.maxValue === 'number'
              ? String(salaryComponent.maxValue)
              : null

          result.compensationCurrencyCode = salaryComponent.currencyCode
          result.compensationInterval = salaryComponent.interval
        }

        const equityComponent = compensationTier.components.find(
          component => component.compensationType === 'EquityPercentage',
        )

        if (equityComponent) {
          result.equityMin =
            typeof equityComponent.minValue === 'number'
              ? String(equityComponent.minValue)
              : null

          result.equityMax =
            typeof equityComponent.maxValue === 'number'
              ? String(equityComponent.maxValue)
              : null
        }
      }
    }

    return result
  }
}
