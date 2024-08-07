import { Container, Flex, Section, Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'

import '@radix-ui/themes/styles.css'

import { Navigation } from './components/nav/navigation'

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
          <Section size="1">
            <Container>
              <Flex height="28px" align="center" justify="between">
                <Navigation />
              </Flex>
            </Container>
          </Section>
          <Section size="1">
            <Container>
              <Flex direction="column" gap="4">
                {children}
              </Flex>
            </Container>
          </Section>
        </Theme>
      </body>
    </html>
  )
}
