import { isAdmin } from '@/lib/auth/is-admin'
import type { GetJobsFilter } from '@/lib/db/queries'
import { type User, currentUser } from '@clerk/nextjs/server'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, Section } from '@radix-ui/themes'
import Link from 'next/link'
import { JobList } from './components/list/job-list'
import type { PageSearchParams } from './types'

type HomeProps = {
  searchParams: PageSearchParams<GetJobsFilter>
}

export default async function Home(props: HomeProps) {
  // TODO: Fix user management
  // TODO: eliminate type assertion
  const user = (await currentUser()) as User

  return (
    <>
      <Section size="1">
        <Flex align="center" justify="between">
          <Heading>Oh! What a tracker!</Heading>
          {isAdmin(user) && (
            <Box>
              <Link href="/add">
                <Button>
                  <PlusIcon />
                  Add a company
                </Button>
              </Link>
            </Box>
          )}
        </Flex>
      </Section>

      <JobList {...props} />
    </>
  )
}
