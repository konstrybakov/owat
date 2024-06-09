import { isAdmin } from '@/lib/auth/is-admin'
import { type User, currentUser } from '@clerk/nextjs/server'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Heading, Section } from '@radix-ui/themes'
import Link from 'next/link'
import { JobList } from './job-list'

export default async function Home() {
  // TODO: Fix user management
  // TODO: eliminate type assertion
  const user = (await currentUser()) as User

  return (
    <>
      <Section size="1">
        <Box mb="4">
          <Heading>Oh! What a tracker!</Heading>
        </Box>
      </Section>
      {isAdmin(user) && (
        <Section size="1">
          <Box>
            <Link href="/add">
              <Button>
                <PlusIcon />
                Add a company
              </Button>
            </Link>
          </Box>
        </Section>
      )}
      <Section size="1">
        <JobList />
      </Section>
    </>
  )
}
