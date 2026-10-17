import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getOwnerSession } from '@/lib/owner-auth'
import {
  listLoginActivity,
  toPublicLoginActivity,
} from '@/lib/login-activity'
import type { PublicLoginActivity } from '@/lib/login-activity-types'
import { LoginActivityDashboard } from './login-activity-dashboard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login activity — GMJ. private',
  robots: { index: false, follow: false },
}

export default async function LoginActivityPage() {
  const session = await getOwnerSession()
  if (!session) {
    redirect('/private/login?callbackUrl=/private/login-activity')
  }

  let initialItems: PublicLoginActivity[] = []
  let loadError: string | null = null

  try {
    const rows = await listLoginActivity()
    initialItems = rows.map(toPublicLoginActivity)
  } catch {
    loadError = 'Could not load login activity. Check the database connection.'
  }

  return (
    <LoginActivityDashboard
      initialItems={initialItems}
      loadError={loadError}
      lastLoginActivityId={session.lastLoginActivityId}
    />
  )
}
