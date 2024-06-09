import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Heading, Section } from '@radix-ui/themes'
import Link from 'next/link'
import { JobList } from './job-list'

export default function Home() {
  return (
    <>
      <Section size="2">
        <Box mb="4">
          <Heading>Oh! What a tracker!</Heading>
        </Box>
      </Section>
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
      <Section size="2">
        <JobList />
      </Section>
    </>
  )
}
