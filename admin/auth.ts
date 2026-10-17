import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { getOwnerEmail, getOwnerPasswordHash } from '@/lib/env'
import { consumeRateLimit } from '@/lib/rate-limit'

const credentialsSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(1).max(200),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, request) => {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) {
          return null
        }

        const ip =
          request?.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
          request?.headers.get('x-real-ip')?.trim() ||
          'unknown'

        const limited = consumeRateLimit(`login:${ip}`, 8, 15 * 60 * 1000)
        if (!limited.ok) {
          return null
        }

        const ownerEmail = getOwnerEmail()
        const email = parsed.data.email.trim().toLowerCase()
        const passwordOk = await compare(
          parsed.data.password,
          getOwnerPasswordHash(),
        )

        if (email !== ownerEmail || !passwordOk) {
          return null
        }

        return {
          id: 'owner',
          email: ownerEmail,
          name: 'Owner',
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 12,
  },
  pages: {
    signIn: '/private/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
      }
      return session
    },
  },
  trustHost: true,
})
