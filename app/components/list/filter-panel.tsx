'use client'
import { SegmentedControl } from '@radix-ui/themes'
import { usePathname, useRouter } from 'next/navigation'

export const FilterPanel = () => {
  const pathname = usePathname()
  const { push } = useRouter()

  const handleValueChange = (value: string) => {
    const searchParams = new URLSearchParams({ filter: value })

    push(`${pathname}?${searchParams}`)
  }

  return (
    <SegmentedControl.Root onValueChange={handleValueChange} defaultValue="new">
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
