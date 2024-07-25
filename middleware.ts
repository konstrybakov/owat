import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher([
  '/api/companies/process',
  '/api/email/jobs',
])

export default clerkMiddleware((auth, request) => {
  if (!isPublic(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
