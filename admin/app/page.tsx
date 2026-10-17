import { redirect } from 'next/navigation'
import { getOwnerSession } from '@/lib/owner-auth'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await getOwnerSession()
  redirect(session ? '/private/login-activity' : '/private/login')
}
