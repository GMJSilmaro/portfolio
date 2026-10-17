import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getOwnerSession } from '@/lib/owner-auth'
import { LoginForm } from './login-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sign in — GMJ. private',
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  const session = await getOwnerSession()
  if (session) {
    redirect('/private/url-location')
  }

  const params = await searchParams
  const callbackUrl =
    params.callbackUrl?.startsWith('/private/') &&
    !params.callbackUrl.startsWith('//')
      ? params.callbackUrl
      : '/private/url-location'

  return (
    <main className="bg-dossier-grain min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center dossier-pad">
        <p className="dossier-kicker">Private · Owner only</p>
        <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
          GMJ. admin
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Cybersecurity URL location tool. Registration is disabled. This area
          is not linked from the public portfolio.
        </p>
        <LoginForm callbackUrl={callbackUrl} error={params.error} />
      </div>
    </main>
  )
}
