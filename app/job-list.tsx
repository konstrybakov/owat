import { queryGetJobs } from '@/lib/db/queries'
import { JobCard } from './job-card'

import { Flex, Reset } from '@radix-ui/themes'

export const JobList = async () => {
  const jobs = await queryGetJobs()

  return (
    <Flex asChild direction="column" gap="3">
      <Reset>
        {/* biome-ignore lint/a11y/noRedundantRoles: safari 👀 */}
        <ul role="list">
          {jobs.map(job => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      </Reset>
    </Flex>
  )
}
