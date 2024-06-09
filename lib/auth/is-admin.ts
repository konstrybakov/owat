import type { User } from '@clerk/nextjs/server'

export const isAdmin = (user: User) => user.id === process.env.ADMIN_USER_ID
