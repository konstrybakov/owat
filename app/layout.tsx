import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Box, Container, Flex, Section, Theme } from '@radix-ui/themes'
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
    <ClerkProvider>
      <html lang="en">
        <body>
          <Theme accentColor="amber" grayColor="sand" radius="small">
            <Section size="1">
              <Container>
                <Flex height="28px" align="center" justify="between">
                  <Navigation />
                  <Flex align="center" asChild>
                    <Box>
                      <SignedOut>
                        <SignInButton />
                      </SignedOut>
                      <SignedIn>
                        <UserButton />
                      </SignedIn>
                    </Box>
                  </Flex>
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
    </ClerkProvider>
  )
}
