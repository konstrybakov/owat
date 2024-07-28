import { logger } from '@/lib/logger'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { type SelectJob, jobs } from '../schema'

type JobActionField = keyof Pick<
  SelectJob,
  'isTopChoice' | 'isHidden' | 'isSeen' | 'isApplied'
>

const createQuery =
  (field: JobActionField, resetFields: JobActionField[] = []) =>
  async (jobId: SelectJob['id'], value: boolean) => {
    const l = logger.child({ jobId, field, value })

    l.debug('Updating job')

    const result = await db
      .update(jobs)
      .set({
        [field]: value,
        ...resetFields.reduce(
          (acc, fieldToReset) => {
            acc[fieldToReset] = false

            return acc
          },
          {} as Record<JobActionField, boolean>,
        ),
      })
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

export const queryMarkApplied = createQuery('isApplied', [
  'isSeen',
  'isTopChoice',
  'isHidden',
])
export type QueryMarkAppliedResult = ReturnType<typeof queryMarkApplied>
