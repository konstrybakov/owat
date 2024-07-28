'use client'
import type { SelectJob } from '@/lib/db/schema'
import {
  EyeNoneIcon,
  EyeOpenIcon,
  LightningBoltIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { ActionButton } from './action-button'
import {
  actionMarkApplied,
  actionMarkHidden,
  actionMarkSeen,
  actionMarkTopChoice,
} from './actions/mark-property'
import { useJobAction } from './hooks/use-job-action'

export const JobCardActions = ({ job }: { job: SelectJob }) => {
  const hidden = useJobAction(job.isHidden, actionMarkHidden)
  const topChoice = useJobAction(job.isTopChoice, actionMarkTopChoice)
  const seen = useJobAction(job.isSeen, actionMarkSeen)
  const applied = useJobAction(job.isApplied, actionMarkApplied)

  return (
    <>
      <Text size="2" color="gray">
        Mark as:
      </Text>
      <ActionButton
        isActive={hidden.isActive}
        loading={hidden.loading}
        clickHandler={() => hidden.clickHandler(job.id)}
        colorActive="sky"
        icon={<EyeNoneIcon />}
        label="Hidden"
      />
      <ActionButton
        isActive={topChoice.isActive}
        loading={topChoice.loading}
        clickHandler={() => topChoice.clickHandler(job.id)}
        colorActive="plum"
        icon={<LightningBoltIcon />}
        label="Top Choice"
      />
      <ActionButton
        isActive={seen.isActive}
        loading={seen.loading}
        clickHandler={() => seen.clickHandler(job.id)}
        colorActive="grass"
        icon={<EyeOpenIcon />}
        label="Seen"
      />
      <ActionButton
        isActive={applied.isActive}
        loading={applied.loading}
        clickHandler={() => applied.clickHandler(job.id)}
        colorActive="pink"
        icon={<RocketIcon />}
        label="Applied"
      />
    </>
  )
}
