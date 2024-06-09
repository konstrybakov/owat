'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Flex, Reset } from '@radix-ui/themes'
import type { Route } from 'next'
import NextLink, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC, HTMLProps } from 'react'

const Link: FC<LinkProps<Route> & HTMLProps<HTMLAnchorElement>> = ({
  href,
  ...props
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <NextLink href={href} className="NavigationMenuLink" {...props} />
    </NavigationMenu.Link>
  )
}

export const Navigation = () => {
  return (
    <NavigationMenu.Root>
      <Reset>
        <Flex gap="3" asChild>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <Link href="/">Home</Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <Link href="/companies">Companies</Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </Flex>
      </Reset>
    </NavigationMenu.Root>
  )
}
