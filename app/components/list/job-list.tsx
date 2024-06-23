import { type GetJobsFilter, queryGetJobs } from '@/lib/db/queries'
import { JobCard } from './job-card'

import type { PageSearchParams } from '@/app/types'
import { Flex, Reset } from '@radix-ui/themes'
import { FilterPanel } from './filter-panel'

type JobListProps = {
  searchParams: PageSearchParams<GetJobsFilter>
}

export const JobList = async ({ searchParams }: JobListProps) => {
  const jobs = await queryGetJobs(
    searchParams.filter ? [searchParams.filter].flat() : ['new'],
  )

  return (
    <>
      <FilterPanel />
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
    </>
  )
}
