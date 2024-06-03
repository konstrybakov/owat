import type { HiringPlatform } from '../db/schema'

export class GreenHouse {
  constructor(private url: URL) {}

  async checkURL(): Promise<HiringPlatform> {
    if (!this.url.hostname.includes('greenhouse.io')) {
      throw new Error('[GreenHouse] URL mismatch')
    }

    const response = await fetch(this.getJobBoardURL())

    if (!response.ok) {
      throw new Error('[GreenHouse] Job board not found')
    }

    return 'greenhouse'
  }

  private getCompanyToken(): string {
    return this.url.pathname.split('/')[1]
  }

  private getJobBoardURL(): string {
    return `https://boards.greenhouse.io/${this.getCompanyToken()}`
  }
}
