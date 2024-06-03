'use client'

import { Flex, RadioCards, Text } from '@radix-ui/themes'

import { useAtom } from 'jotai'
import { variantAtom } from '../state'
import type { Variant } from './types'

export const VariantPicker = () => {
  const [variant, setVariant] = useAtom(variantAtom)

  return (
    <RadioCards.Root
      value={variant}
      onValueChange={variant => setVariant(variant as Variant)}
      defaultValue="url"
      columns={{ initial: '1', sm: '4' }}
    >
      <RadioCards.Item value="search">
        <Flex direction="column">
          <Text trim="start" weight="bold">
            Name
          </Text>
          <Text trim="end">
            Search for a company by name and select from the results
          </Text>
        </Flex>
      </RadioCards.Item>
      <RadioCards.Item value="url">
        <Flex direction="column">
          <Text weight="bold">URL</Text>
          <Text>Paste a URL of one of the well known hiring platforms</Text>
        </Flex>
      </RadioCards.Item>
    </RadioCards.Root>
  )
}
