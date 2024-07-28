'use client'
import { SegmentedControl } from '@radix-ui/themes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const FilterPanel = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { push } = useRouter()

  const filter = searchParams.get('filter') || 'new'

  const handleValueChange = (value: string) => {
    const searchParams = new URLSearchParams({ filter: value })

    push(`${pathname}?${searchParams}`)
  }

  return (
    <SegmentedControl.Root onValueChange={handleValueChange} value={filter}>
      <SegmentedControl.Item value="new">New / Unseen</SegmentedControl.Item>
      <SegmentedControl.Item value="topChoice">
        Top Choice
      </SegmentedControl.Item>
      <SegmentedControl.Item value="seen">Seen</SegmentedControl.Item>
      <SegmentedControl.Item value="hidden">Hidden</SegmentedControl.Item>
      <SegmentedControl.Item value="applied">Applied</SegmentedControl.Item>
      <SegmentedControl.Item value="all">All</SegmentedControl.Item>
    </SegmentedControl.Root>
  )
}
