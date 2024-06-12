import type { SelectJob } from '@/lib/db/schema'
import { useState } from 'react'
import type { createAction } from '../actions/create-action'

export const useJobAction = (
  initialState: boolean,
  action: ReturnType<typeof createAction>,
) => {
  const [isActive, setIsActive] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const clickHandler = async (jobId: SelectJob['id']) => {
    const newState = !isActive

    setLoading(true)

    try {
      const result = await action(jobId, newState)

      if (result.error) {
        // TODO: Add toast notifications
        console.error(result.errorMessage)
      } else {
        setIsActive(newState)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { isActive, loading, clickHandler }
}
