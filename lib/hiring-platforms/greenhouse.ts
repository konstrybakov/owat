import { queryInsertJobs, queryMarkJobsAsClosed } from '../db/queries'
import type { HiringPlatformName, InsertJob, SelectCompany } from '../db/schema'
import { logger } from '../logger'
import { HiringPlatform } from './base'

type GreenhouseJob = {
  absolute_url: string
  location: {
    name: string
  }
  updated_at: string
  title: string
  content: string
  departments: Array<{
    name: string
  }>
}

export class Greenhouse extends HiringPlatform {
  async checkURL(): Promise<HiringPlatformName> {
    if (!this.url.hostname.endsWith('greenhouse.io')) {
      throw new Error('[Greenhouse] URL mismatch')
    }

    const response = await fetch(this.getJobBoardURL())

    if (!response.ok) {
      throw new Error('[Greenhouse] Job board not found')
    }

    return 'greenhouse'
  }

  private getCompanyToken(): string {
    return this.url.pathname.split('/')[1]
  }

  private getJobBoardURL(): string {
    return `https://boards.greenhouse.io/${this.getCompanyToken()}`
  }

  private getJobBoardAPIURL(): string {
    return `https://boards-api.greenhouse.io/v1/boards/${this.getCompanyToken()}/jobs?content=true`
  }

  async fetchJobs(companyId: SelectCompany['id']): Promise<void> {
    const response = await fetch(this.getJobBoardAPIURL())

    if (!response.ok) {
      throw new Error('[Greenhouse] Job board API not found')
    }

    const result = (await response.json()) as { jobs: GreenhouseJob[] }

    logger.debug(
      `[Greenhouse][${this.getCompanyToken()}] Found ${
        result.jobs.length
      } jobs`,
    )

    const openJobs = result.jobs.map(job => this.mapJob(job, companyId))

    await queryInsertJobs(openJobs)
    await queryMarkJobsAsClosed(companyId, openJobs)
  }

  private mapJob(
    job: GreenhouseJob,
    companyId: SelectCompany['id'],
  ): InsertJob {
    return {
      url: job.absolute_url,
      title: job.title,
      location: job.location.name,
      lastUpdatedAt: new Date(job.updated_at),
      content: job.content,
      departments: job.departments.map(department => department.name),
      companyId,
    }
  }
}
