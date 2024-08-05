import { auth, signIn } from '@/app/auth'
import { Button } from '@radix-ui/themes'
import { UserAuth } from './user'

export const Auth = async () => {
  const session = await auth()

  if (!session?.user) {
    return (
      <form
        action={async () => {
          'use server'
          await signIn()
        }}
      >
        <Button type="submit">Sign in</Button>
      </form>
    )
  }

  return <UserAuth user={session.user} />
}
