import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireOwner } from '@/lib/owner-auth'
import { prisma } from '@/lib/db'
import { toPublicLoginActivity } from '@/lib/login-activity'

const bodySchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('granted'),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    accuracyM: z.number().positive().max(100_000),
  }),
  z.object({
    status: z.enum(['denied', 'unsupported', 'timeout', 'error']),
  }),
])

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(request: Request, context: RouteContext) {
  const gate = await requireOwner()
  if (!gate.ok) return gate.response

  const { id } = await context.params
  if (!id || id.length > 64) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const existing = await prisma.loginActivity.findUnique({ where: { id } })
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const data =
    parsed.data.status === 'granted'
      ? {
          deviceLatitude: parsed.data.latitude,
          deviceLongitude: parsed.data.longitude,
          deviceAccuracyM: parsed.data.accuracyM,
          deviceCapturedAt: new Date(),
          deviceLocationSource: 'BROWSER' as const,
        }
      : {
          deviceLocationSource:
            parsed.data.status === 'denied'
              ? ('DENIED' as const)
              : parsed.data.status === 'unsupported'
                ? ('UNSUPPORTED' as const)
                : parsed.data.status === 'timeout'
                  ? ('TIMEOUT' as const)
                  : ('ERROR' as const),
        }

  const updated = await prisma.loginActivity.update({
    where: { id },
    data,
  })

  return NextResponse.json({ item: toPublicLoginActivity(updated) })
}
