'use server'

import { querySelectCompanyByTrackerURL } from '@/lib/db/queries'
import type { HiringPlatformName } from '@/lib/db/schema'
import { platformRegistry } from '@/lib/hiring-platforms/registry'

import type { ActionResponse } from '@/lib/types/api'

export const actionCheckURL = async (
  urlString: string,
): Promise<ActionResponse<HiringPlatformName>> => {
  try {
    const isDuplicate = Boolean(
      (await querySelectCompanyByTrackerURL(urlString)).length,
    )

    if (isDuplicate) {
      throw new Error('This URL has already been added')
    }

    const url = new URL(urlString)

    const platformCheckPromises = []

    for (const Platform of platformRegistry.values()) {
      const platform = new Platform(url)

      platformCheckPromises.push(platform.checkURL())
    }

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
