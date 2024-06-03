'use server'

import { querySelectCompanyByTrackerURL } from '@/lib/db/queries'
import type { HiringPlatform } from '@/lib/db/schema'
import { hiringPlatforms } from '@/lib/hiring-platforms/hiring-platforms'

import type { ActionResponse } from '@/lib/types/api'

export const actionCheckURL = async (
  urlString: string,
): Promise<ActionResponse<HiringPlatform>> => {
  try {
    const isDuplicate = Boolean(
      (await querySelectCompanyByTrackerURL(urlString)).length,
    )

    if (isDuplicate) {
      throw new Error('This URL has already been added')
    }

    const url = new URL(urlString)

    const platformCheckPromises = hiringPlatforms.map(Platform => {
      const platform = new Platform(url)

      return platform.checkURL()
    })

    return {
      data: await Promise.any(platformCheckPromises),
      error: false,
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '[Action][Check URL] Unknown error'

    return {
      error: true,
      errorMessage: message,
    }
  }
}
