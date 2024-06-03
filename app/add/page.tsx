import { Box, Heading, Section, Separator } from '@radix-ui/themes'

import { Provider } from 'jotai'
import { CompanyName } from './company/company-data'
import { VariantPicker } from './variant/picker'
import { VariantRenderer } from './variant/renderer'

export default function Add() {
  return (
    <Provider>
      <Section size="2">
        <Box>
          <Heading>Add a company</Heading>
        </Box>
      </Section>
      <Section size="2">
        <VariantPicker />
      </Section>

      <Separator size="3" />

      <Section size="2">
        <VariantRenderer />
      </Section>
      <Section size="1">
        <CompanyName />
      </Section>
    </Provider>
  )
}
