import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isLoginPage =
    pathname === '/private/login' || pathname === '/private/login/'
  const isPrivatePage = pathname.startsWith('/private/') && !isLoginPage
  const isProtectedApi = pathname.startsWith('/api/analyze-url')

  if (!isPrivatePage && !isProtectedApi) {
    return NextResponse.next()
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/private/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  return response
}

export const config = {
  matcher: ['/private/:path*', '/api/analyze-url'],
}
