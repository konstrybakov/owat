import { logger } from '@/lib/logger'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { type SelectJob, jobs } from '../schema'

type JobActionField = keyof Pick<
  SelectJob,
  'isTopChoice' | 'isHidden' | 'isSeen'
>

const createQuery =
  (field: JobActionField) => async (jobId: SelectJob['id'], value: boolean) => {
    const l = logger.child({ jobId, field, value })

    l.debug('Updating job')

    const result = await db
      .update(jobs)
      .set({ [field]: value })
      .where(eq(jobs.id, jobId))
      .returning({ id: jobs.id })

    return result
  }

export const queryMarkTopChoice = createQuery('isTopChoice')
export type QueryMarkTopChoiceResult = ReturnType<typeof queryMarkTopChoice>

export const queryMarkHidden = createQuery('isHidden')
export type QueryMarkHiddenResult = ReturnType<typeof queryMarkHidden>

export const queryMarkSeen = createQuery('isSeen')
export type QueryMarkSeenResult = ReturnType<typeof queryMarkSeen>
