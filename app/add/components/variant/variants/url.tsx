import type { HiringPlatformName } from '@/lib/db/schema'
import { normalizeURL } from '@/lib/utils/normalize-url'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useAtom, useSetAtom } from 'jotai'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { platformAtom, trackerURLAtom } from '../../../state'
import { actionCheckURL } from '../actions/check-url'

const schema = z.object({
  url: z.string().min(1, 'URL must not be empty').url(),
})

const platformLogo: Record<HiringPlatformName, string> = {
  ashby: 'ashby.png',
  greenhouse: 'greenhouse.svg',
  lever: 'lever.svg',
}

type FormType = z.infer<typeof schema>

export const VariantURL = () => {
  const [platform, setPlatform] = useAtom(platformAtom)
  const setTrackerURL = useSetAtom(trackerURLAtom)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  const checkURL = async ({ url }: FormType) => {
    const normalizedURL = normalizeURL(url)

    const response = await actionCheckURL(normalizedURL)

    if (response.error) {
      console.error(response.errorMessage)

      if (response.errorMessage === 'This URL has already been added') {
        setError(
          'url',
          {
            type: 'manual',
            message: response.errorMessage,
          },
          { shouldFocus: true },
        )
      }
    } else {
      setPlatform(response.data)
      setTrackerURL(normalizedURL)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(checkURL)}>
        <Box width="500px">
          <Flex direction="column" gap="1">
            <Text size="2" weight="medium" as="label" htmlFor="url">
              Hiring Platform URL
            </Text>
            <Flex width="600px" gap="2">
              <Box flexGrow="1">
                <TextField.Root
                  {...register('url', { required: true })}
                  id="url"
                  placeholder="Paste hiring platform url here ..."
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Box>
              <Box>
                <Button loading={isSubmitting} type="submit">
                  Submit
                </Button>
              </Box>
            </Flex>
            {errors.url && (
              // TODO: Check a11y
              <Text size="1" color="tomato">
                {errors.url.message}
              </Text>
            )}
          </Flex>
        </Box>
      </form>
      {platform && (
        <Box mt="3">
          <Text size="1" color="gray">
            Matched hiring platform
          </Text>
          <Box maxWidth="240px">
            <Card>
              <Flex gap="3" align="center">
                <Image
                  src={`/hiring-platforms/${platformLogo[platform]}`}
                  alt={`${platform} logo`}
                  width="32"
                  height="32"
                />
                <Flex direction="column">
                  <Heading size="2">{platform}</Heading>
                </Flex>
                <CheckIcon color="grass" />
              </Flex>
            </Card>
          </Box>
        </Box>
      )}
    </>
  )
}
