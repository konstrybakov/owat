import type { QueryGetJobsResult } from '@/lib/db/queries'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import {
  AccessibleIcon,
  Badge,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes'
import NextLink from 'next/link'

type JobCardProps = {
  job: Awaited<QueryGetJobsResult>[number]
}

// TODO: design, refactor
export const JobCard = async ({ job }: JobCardProps) => {
  return (
    <Card>
      <Grid columns="2" gap="1">
        <Flex gap="1" align="center">
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
          <Text size="2" weight="medium" color="gray">
            {job.departments.join(' > ')}
          </Text>
          <Separator orientation="vertical" />
          <Text size="2">
            {new Intl.DateTimeFormat('en-UK', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(new Date(job.lastUpdatedAt))}
          </Text>
        </Flex>
      </Grid>
    </Card>
  )
}
