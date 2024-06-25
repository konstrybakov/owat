import { isAdmin } from '@/lib/auth/is-admin'
import type { QueryGetJobsResult } from '@/lib/db/queries'
import { type User, currentUser } from '@clerk/nextjs/server'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import {
  AccessibleIcon,
  Badge,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from '@radix-ui/themes'
import NextLink from 'next/link'
import { JobCardActions } from './job-card-actions'

type JobCardProps = {
  job: Awaited<QueryGetJobsResult>['data'][number]
}

// TODO: design, refactor
export const JobCard = async ({ job }: JobCardProps) => {
  const user = (await currentUser()) as User

  return (
    <Card>
      <Grid columns="auto 1fr" rows="repeat(2, minmax(22px, auto))" gap="2">
        <Flex gap="2" align="center">
          <Text size="2" weight="medium" color="gray">
            {job.departments.join(' > ')}
          </Text>
          <Heading size="3">{job.title} </Heading>
          <Link trim="end" asChild>
            <NextLink target="_blank" href={job.url}>
              <AccessibleIcon label="View job description on hiring platform">
                <ExternalLinkIcon />
              </AccessibleIcon>
            </NextLink>
          </Link>
          <Badge color={job.status === 'open' ? 'grass' : 'tomato'}>
            {job.status}
          </Badge>
        </Flex>
        <Text align="right" size="2">
          {job.location}
        </Text>
        <Text size="2" weight="medium">
          {job.company.name}
        </Text>
        <Flex gap="2" justify="end">
          <Text size="2">
            {new Intl.DateTimeFormat('en-UK', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(job.lastUpdatedAt))}
          </Text>
        </Flex>
        {isAdmin(user) && (
          <Flex align="center" gridColumn="1/-1" gap="2" justify="end">
            <JobCardActions job={job} />
          </Flex>
        )}
      </Grid>
    </Card>
  )
}
