import { type GetJobsFilter, queryGetJobs } from '@/lib/db/queries'
import { JobCard } from './job-card'

import type { PageSearchParams } from '@/app/types'
import { Flex, Reset } from '@radix-ui/themes'
import { FilterPanel } from './filter-panel'
import { Pagination } from './pagination'

type JobListProps = {
  searchParams: PageSearchParams<GetJobsFilter>
}

export const JobList = async ({ searchParams }: JobListProps) => {
  // TODO: error handling
  const result = await queryGetJobs(
    searchParams.filter ? [searchParams.filter].flat() : ['new'],
    searchParams.page ? Number(searchParams.page) : 1,
  )

  return (
    <Flex direction="column" gap="3">
      <FilterPanel />
      <Flex asChild direction="column" gap="3">
        <Reset>
          {/* biome-ignore lint/a11y/noRedundantRoles: safari 👀 */}
          <ul role="list">
            {result.data.map(job => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        </Reset>
      </Flex>
      <Pagination total={result.total} />
    </Flex>
  )
}
