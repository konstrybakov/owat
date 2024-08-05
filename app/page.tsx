import type { GetJobsFilter } from '@/lib/db/queries'
import { isAdmin } from '@/lib/utils/is-admin'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, Section } from '@radix-ui/themes'
import Link from 'next/link'
import { auth } from './auth'
import { JobList } from './components/list/job-list'
import type { PageSearchParams } from './types'

type HomeProps = {
  searchParams: PageSearchParams<GetJobsFilter>
}

export default async function Home(props: HomeProps) {
  const session = await auth()

  return (
    <>
      <Section size="1">
        <Flex align="center" justify="between">
          <Heading>Oh! What a tracker!</Heading>
          {isAdmin(session?.user) && (
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
