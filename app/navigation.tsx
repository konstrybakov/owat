'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
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
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <Link href="/">Home</Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link href="/companies">Companies</Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
