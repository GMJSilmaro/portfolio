import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireOwner } from '@/lib/owner-auth'
import { analyzeUrl } from '@/lib/analyze-url'
import { consumeRateLimit } from '@/lib/rate-limit'

const bodySchema = z.object({
  url: z.string().trim().min(1).max(2048),
})

export async function POST(request: Request) {
  const gate = await requireOwner()
  if (!gate.ok) return gate.response

  const limited = consumeRateLimit(
    `analyze:${gate.session.email}`,
    30,
    60 * 1000,
  )
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfterSec: limited.retryAfterSec },
      {
        status: 429,
        headers: { 'Retry-After': String(limited.retryAfterSec) },
      },
    )
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid URL payload' }, { status: 400 })
  }

  try {
    const result = await analyzeUrl(parsed.data.url)
    return NextResponse.json(result)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to analyze URL'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
