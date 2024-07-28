'use server'
import {
  queryMarkApplied,
  queryMarkHidden,
  queryMarkSeen,
  queryMarkTopChoice,
} from '@/lib/db/queries/job-action'
import { createAction } from './create-action'

export const actionMarkTopChoice = createAction(queryMarkTopChoice)
export const actionMarkHidden = createAction(queryMarkHidden)
export const actionMarkSeen = createAction(queryMarkSeen)
export const actionMarkApplied = createAction(queryMarkApplied)
