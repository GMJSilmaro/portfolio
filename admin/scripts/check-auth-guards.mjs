#!/usr/bin/env node
/**
 * Verifies the owner gate rejects unauthenticated access to the URL tool
 * and analyze API. Does not require a live database.
 */
import { getToken } from 'next-auth/jwt'

process.env.AUTH_SECRET =
  process.env.AUTH_SECRET || 'test-auth-secret-at-least-32-characters-long'
process.env.OWNER_EMAIL = process.env.OWNER_EMAIL || 'owner@example.com'

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message)
    process.exitCode = 1
  } else {
    console.log('OK:', message)
  }
}

/** Mirrors admin/middleware.ts — keep in sync when changing the gate. */
async function ownerGate(url) {
  const pathname = new URL(url).pathname
  const isLoginPage =
    pathname === '/private/login' || pathname === '/private/login/'
  const isPrivatePage = pathname.startsWith('/private/') && !isLoginPage
  const isProtectedApi = pathname.startsWith('/api/analyze-url')

  if (!isPrivatePage && !isProtectedApi) {
    return { status: 200 }
  }

  const request = {
    headers: new Headers(),
    nextUrl: { pathname },
    url,
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  const email = typeof token?.email === 'string' ? token.email.toLowerCase() : null
  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase()
  const isOwner = !!email && !!owner && email === owner

  if (!isOwner) {
    if (isProtectedApi) {
      return { status: 401 }
    }
    return { status: 307 }
  }
  return { status: 200 }
}

async function run() {
  const cases = [
    {
      url: 'http://localhost/api/analyze-url',
      expectStatus: 401,
      label: 'POST /api/analyze-url without session → 401',
    },
    {
      url: 'http://localhost/private/url-location',
      expectStatus: 307,
      label: 'URL tool without session → redirect to login',
    },
    {
      url: 'http://localhost/private/login',
      expectStatus: 200,
      label: 'login page remains reachable without session',
    },
  ]

  for (const testCase of cases) {
    const result = await ownerGate(testCase.url)
    assert(
      result.status === testCase.expectStatus,
      `${testCase.label} (got ${result.status})`,
    )
  }

  if (process.exitCode) {
    process.exit(process.exitCode)
  }
  console.log('\nAll auth-guard checks passed.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
