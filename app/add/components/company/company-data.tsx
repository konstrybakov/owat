'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RocketIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { useAtomValue } from 'jotai'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { platformAtom, trackerURLAtom } from '../../state'
import { actionCreateCompany } from './actions/create-company'

const schema = z.object({
  name: z.string().min(1),
})

type FormType = z.infer<typeof schema>

export const CompanyName = () => {
  const platform = useAtomValue(platformAtom)
  const trackerURL = useAtomValue(trackerURLAtom)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })

  if (!platform || !trackerURL) {
    return null
  }

  // TODO: Handle errors
  const createCompany = async ({ name }: FormType) => {
    const result = await actionCreateCompany({
      trackerURL,
      name,
      hiringPlatform: platform,
      trackerType: 'hiring_platform', // TODO: handle this logic properly
    })

    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit(createCompany)}>
      <Box width="500px">
        <Flex direction="column" gap="1">
          <Text size="2" weight="medium" as="label" htmlFor="url">
            Company name
          </Text>
          <Flex width="600px" gap="2">
            <Box flexGrow="1">
              <TextField.Root
                {...register('name', { required: true })}
                id="url"
                placeholder="Enter company name here ..."
              >
                <TextField.Slot>
                  <RocketIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
              <Button loading={isSubmitting} type="submit">
                Create
              </Button>
            </Box>
          </Flex>
          {errors.name && (
            // TODO: Check a11y
            <Text size="1" color="tomato">
              {errors.name.message}
            </Text>
          )}
        </Flex>
      </Box>
    </form>
  )
}
