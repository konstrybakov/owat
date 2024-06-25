'use client'
import { TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type PaginationProps = {
  total: number
}

export const Pagination = ({ total }: PaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const isLastPage = total <= page * 10

  const createSearchParams = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('page', String(page))

    return newSearchParams.toString()
  }

  const clickHandler = (page: number) => {
    router.push(`${pathname}?${createSearchParams(page)}`)
  }

  return (
    <Flex gap="3" justify="center">
      <IconButton
        onClick={() => clickHandler(page - 1)}
        disabled={page === 1}
        variant="surface"
      >
        <TriangleLeftIcon />
      </IconButton>
      <IconButton
        onClick={() => clickHandler(page + 1)}
        disabled={isLastPage}
        variant="surface"
      >
        <TriangleRightIcon />
      </IconButton>
    </Flex>
  )
}
