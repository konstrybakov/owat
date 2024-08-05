import { Box, Heading, Section, Separator } from '@radix-ui/themes'

import { isAdmin } from '@/lib/utils/is-admin'
import { Provider } from 'jotai'
import { redirect } from 'next/navigation'
import { auth } from '../auth'
import { CompanyName } from './components/company/company-data'
import { VariantPicker } from './components/variant/picker'
import { VariantRenderer } from './components/variant/renderer'

export default async function Add() {
  const session = await auth()

  if (!isAdmin(session?.user)) {
    return redirect('/')
  }

  return (
    <Provider>
      <Section size="1">
        <Box>
          <Heading>Add a company</Heading>
        </Box>
      </Section>
      <Section size="1">
        <VariantPicker />
      </Section>

      <Separator size="3" />

      <Section size="1">
        <VariantRenderer />
      </Section>
      <Section size="1">
        <CompanyName />
      </Section>
    </Provider>
  )
}
