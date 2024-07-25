'use client'

import type { GetJobsFilter } from '@/lib/db/queries'
import { Button, Flex, Reset } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const FilterButton = ({
  searchParams,
  title,
  active = false,
}: { searchParams: string; title: string; active?: boolean }) => {
  const pathname = usePathname()

  return (
    <Link href={`${pathname}?${searchParams}`}>
      <Button variant={active ? 'solid' : 'outline'}>{title}</Button>
    </Link>
  )
}

export const FilterPanel = () => {
  const searchParams = useSearchParams()

  const createSearchParams = useCallback(
    (filter: GetJobsFilter, shouldReset = filter === 'all') => {
      const newSearchParams = new URLSearchParams(searchParams)

      const shouldRemove = newSearchParams
        .getAll('filter')
        .some(existingFilter => existingFilter === filter)

      if (!newSearchParams.has('filter')) {
        newSearchParams.set('filter', 'new')
      }

      if (shouldRemove) {
        newSearchParams.delete('filter', filter)
      } else if (shouldReset) {
        newSearchParams.set('filter', filter)
      } else {
        newSearchParams.delete('filter', 'all')
        newSearchParams.append('filter', filter)
      }

      newSearchParams.delete('page')

      return newSearchParams.toString()
    },
    [searchParams],
  )

  return (
    <Flex gap="3" asChild>
      <Reset>
        <ul>
          <li>
            <FilterButton
              title="New / Unseen"
              searchParams={createSearchParams('new')}
              active={
                searchParams.getAll('filter').includes('new') ||
                !searchParams.has('filter')
              }
            />
          </li>
          <li>
            <FilterButton
              title="Top Choice"
              searchParams={createSearchParams('topChoice')}
              active={searchParams.getAll('filter').includes('topChoice')}
            />
          </li>
          <li>
            <FilterButton
              title="Seen"
              searchParams={createSearchParams('seen')}
              active={searchParams.getAll('filter').includes('seen')}
            />
          </li>
          <li>
            <FilterButton
              title="Hidden"
              searchParams={createSearchParams('hidden')}
              active={searchParams.getAll('filter').includes('hidden')}
            />
          </li>
          <li>
            <FilterButton
              title="All"
              searchParams={createSearchParams('all')}
              active={searchParams.getAll('filter').includes('all')}
            />
          </li>
        </ul>
      </Reset>
    </Flex>
  )
}
