import type { QueryGetJobsResult } from '@/lib/db/queries'

import { auth } from '@/app/auth'
import { isAdmin } from '@/lib/utils/is-admin'
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
  const session = await auth()

  return (
    <Card size="2">
      <Grid columns="auto 1fr" rows="repeat(3, 24px)" align="center" gap="3">
        <Flex gap="3" align="center">
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
        <Flex gap="3" justify="end">
          <Text size="2">
            {new Intl.DateTimeFormat('en-UK', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(job.lastUpdatedAt))}
          </Text>
        </Flex>
        <Flex align="center" justify="between" gridColumn="1/-1">
          <Text size="2" color="gray">
            {job.compensationSummary}
          </Text>
          {isAdmin(session?.user) && (
            <Flex align="center" gap="3" justify="between">
              <JobCardActions job={job} />
            </Flex>
          )}
        </Flex>
      </Grid>
    </Card>
  )
}
