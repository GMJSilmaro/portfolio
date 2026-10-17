import { NextResponse } from 'next/server'
import { getCronSecret } from '@/lib/env'
import { purgeExpiredLoginActivity } from '@/lib/login-activity'

export async function GET(request: Request) {
  const secret = getCronSecret()
  const authHeader = request.headers.get('authorization')
  const bearer = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null

  if (!secret || bearer !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const deleted = await purgeExpiredLoginActivity()
  return NextResponse.json({ deleted })
}
