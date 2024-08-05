'use client'

import { Avatar, Button, DropdownMenu, Flex } from '@radix-ui/themes'
import type { User } from 'next-auth'
import { signOut } from 'next-auth/react'

export const UserAuth = ({ user }: { user: User }) => {
  return (
    <Flex align="center" gap="3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            {user.name}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          <DropdownMenu.Item
            onSelect={async () => {
              await signOut()
            }}
          >
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Avatar
        src={user.image ?? undefined}
        alt={user.name ?? 'User profile picture'}
        fallback={user.name?.charAt(0).toUpperCase() ?? '😕'}
      />
    </Flex>
  )
}
