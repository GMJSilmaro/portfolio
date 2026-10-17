import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getOwnerSession } from '@/lib/owner-auth'
import { UrlLocationTool } from './url-location-tool'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'URL location — GMJ. private',
  robots: { index: false, follow: false },
}

export default async function UrlLocationPage() {
  const session = await getOwnerSession()
  if (!session) {
    redirect('/private/login?callbackUrl=/private/url-location')
  }

  return <UrlLocationTool />
}
