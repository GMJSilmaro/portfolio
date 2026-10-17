'use client'

import { useState, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
  callbackUrl: string
  error?: string
}

export function LoginForm({ callbackUrl, error }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(
    error ? 'Sign-in failed. Check your credentials or try again later.' : null,
  )

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')

    startTransition(async () => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setFormError(
          'Sign-in failed. Check your credentials or try again later.',
        )
        return
      }

      router.push(callbackUrl)
      router.refresh()
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-4 border border-[color:var(--rule)] bg-panel p-6"
      autoComplete="on"
    >
      <label className="block space-y-1.5">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          maxLength={320}
          autoComplete="username"
          className="w-full border border-[color:var(--rule-strong)] bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-signal"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          maxLength={200}
          autoComplete="current-password"
          className="w-full border border-[color:var(--rule-strong)] bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-signal"
        />
      </label>

      {formError ? (
        <p className="text-sm text-stamp" role="alert">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-signal px-4 py-2.5 text-sm font-medium text-white transition hover:bg-signal-soft disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
