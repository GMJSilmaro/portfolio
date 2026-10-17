import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { getOwnerEmail, getOwnerPasswordHash } from '@/lib/env'
import { observeClient } from '@/lib/client-info'
import { isLoginRateLimited, recordLoginAttempt } from '@/lib/rate-limit'
import { recordSuccessfulLogin } from '@/lib/login-activity'

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

        const observation = observeClient(
          request ?? new Request('http://localhost'),
        )
        if (await isLoginRateLimited(observation.clientIp)) {
          await recordLoginAttempt(observation.clientIp, false)
          return null
        }

        const ownerEmail = getOwnerEmail()
        const email = parsed.data.email.trim().toLowerCase()
        const passwordOk = await compare(
          parsed.data.password,
          getOwnerPasswordHash(),
        )
        const emailOk = email === ownerEmail

        if (!emailOk || !passwordOk) {
          await recordLoginAttempt(observation.clientIp, false)
          return null
        }

        await recordLoginAttempt(observation.clientIp, true)
        const activity = await recordSuccessfulLogin(observation)

        return {
          id: 'owner',
          email: ownerEmail,
          name: 'Owner',
          lastLoginActivityId: activity.id,
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
      if (user) {
        token.email = user.email
        token.lastLoginActivityId =
          (user as { lastLoginActivityId?: string }).lastLoginActivityId ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
        session.user.lastLoginActivityId =
          (token.lastLoginActivityId as string | null | undefined) ?? null
      }
      return session
    },
    async authorized({ auth: session }) {
      return !!session?.user?.email
    },
  },
  trustHost: true,
})
