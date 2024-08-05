import type { User } from 'next-auth'

export const isAdmin = (user?: User) => {
  return user && user.email === process.env.PERSONAL_EMAIL
}
