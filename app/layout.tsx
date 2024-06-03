import { Container, Flex, Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'

import '@radix-ui/themes/styles.css'
import { Navigation } from './navigation'

export const metadata: Metadata = {
  title: 'OWAT!',
  description: 'Oh! What a tracker!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="amber" grayColor="sand" radius="small">
          <Container>
            <Flex direction="column" gap="4">
              <Navigation />
              {children}
            </Flex>
          </Container>
        </Theme>
      </body>
    </html>
  )
}
