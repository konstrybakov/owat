import { Box, Heading, Section, Separator } from '@radix-ui/themes'

import { isAdmin } from '@/lib/auth/is-admin'
import { type User, currentUser } from '@clerk/nextjs/server'
import { Provider } from 'jotai'
import { redirect } from 'next/navigation'
import { CompanyName } from './company/company-data'
import { VariantPicker } from './variant/picker'
import { VariantRenderer } from './variant/renderer'

export default async function Add() {
  const user = (await currentUser()) as User

  if (!isAdmin(user)) {
    redirect('/')
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
