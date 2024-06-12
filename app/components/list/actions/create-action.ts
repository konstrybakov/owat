import type { SelectJob } from '@/lib/db/schema'
import { logger } from '@/lib/logger'
import type { ActionResponse } from '@/lib/types/api'

export const createAction =
  <QR>(query: (jobId: SelectJob['id'], property: boolean) => Promise<QR>) =>
  async (
    jobId: SelectJob['id'],
    property: boolean,
  ): Promise<ActionResponse<QR>> => {
    const l = logger.child({ jobId, property })

    try {
      const result = await query(jobId, property)

      return {
        data: result,
        error: false,
      }
    } catch (error) {
      l.error(error)

      return {
        error: true,
        errorMessage:
          error instanceof Error
            ? error.message
            : '[createAction] Unknown error',
      }
    }
  }
