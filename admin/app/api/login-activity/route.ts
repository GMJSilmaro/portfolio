import { NextResponse } from 'next/server'
import { requireOwner } from '@/lib/owner-auth'
import {
  deleteAllLoginActivity,
  listLoginActivity,
  toPublicLoginActivity,
} from '@/lib/login-activity'

export async function GET() {
  const gate = await requireOwner()
  if (!gate.ok) return gate.response

  try {
    const rows = await listLoginActivity()
    return NextResponse.json({
      items: rows.map(toPublicLoginActivity),
      latest: rows[0] ? toPublicLoginActivity(rows[0]) : null,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to load login activity' },
      { status: 500 },
    )
  }
}

export async function DELETE() {
  const gate = await requireOwner()
  if (!gate.ok) return gate.response

  try {
    const deleted = await deleteAllLoginActivity()
    return NextResponse.json({ deleted })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete login activity' },
      { status: 500 },
    )
  }
}
