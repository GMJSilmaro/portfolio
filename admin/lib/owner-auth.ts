import { auth } from '@/auth'
import { tryGetOwnerEmail } from '@/lib/env'
import { NextResponse } from 'next/server'

export type OwnerSession = {
  email: string
  lastLoginActivityId: string | null
}

/** Server-side owner gate. Unlisted URLs are not access control. */
export async function requireOwner(): Promise<
  { ok: true; session: OwnerSession } | { ok: false; response: NextResponse }
> {
  const session = await auth()
  const email = session?.user?.email?.trim().toLowerCase()
  const owner = tryGetOwnerEmail()

  if (!owner || !email || email !== owner) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  return {
    ok: true,
    session: {
      email,
      lastLoginActivityId: session?.user?.lastLoginActivityId ?? null,
    },
  }
}

export async function getOwnerSession(): Promise<OwnerSession | null> {
  const result = await requireOwner()
  if (!result.ok) return null
  return result.session
}
