import { Box, Flex, Link, Reset } from '@radix-ui/themes'
import NextLink from 'next/link'

import type {} from 'react'
import { Auth } from './auth/auth'

export const Navigation = () => {
  return (
    <Reset>
      <Flex
        width="100%"
        align="center"
        p="3"
        px="4"
        gap="3"
        asChild
        style={{
          borderRadius: 'var(--radius-4)',
          background: 'var(--accent-2)',
          border: '3px solid var(--accent-3)',
        }}
      >
        <ul>
          <li>
            <Link underline="hover" asChild>
              <NextLink href="/">Home</NextLink>
            </Link>
          </li>
          <li>
            <Link underline="hover" asChild>
              <NextLink href="/companies">Companies</NextLink>
            </Link>
          </li>
          <Box ml="auto" asChild>
            <li>
              <Auth />
            </li>
          </Box>
        </ul>
      </Flex>
    </Reset>
  )
}
