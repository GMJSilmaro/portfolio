import { prisma } from '@/lib/db'
import type { ClientObservation } from '@/lib/client-info'
import type { LoginActivity } from '@prisma/client'
import type { PublicLoginActivity } from '@/lib/login-activity-types'

export type { PublicLoginActivity } from '@/lib/login-activity-types'

const RETENTION_DAYS = 30

export async function purgeExpiredLoginActivity(): Promise<number> {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000)
  const result = await prisma.loginActivity.deleteMany({
    where: { createdAt: { lt: cutoff } },
  })
  return result.count
}

export async function recordSuccessfulLogin(
  observation: ClientObservation,
): Promise<LoginActivity> {
  await purgeExpiredLoginActivity()

  return prisma.loginActivity.create({
    data: {
      clientIp: observation.clientIp,
      ipCity: observation.ipCity,
      ipRegion: observation.ipRegion,
      ipCountry: observation.ipCountry,
      ipLocationSource: observation.ipLocationSource,
      ipLocationUnavailable: observation.ipLocationUnavailable,
      browser: observation.browser,
      os: observation.os,
      userAgent: observation.userAgent,
    },
  })
}

export async function listLoginActivity() {
  await purgeExpiredLoginActivity()
  return prisma.loginActivity.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function deleteAllLoginActivity(): Promise<number> {
  const result = await prisma.loginActivity.deleteMany()
  return result.count
}

export function toPublicLoginActivity(row: LoginActivity): PublicLoginActivity {
  return {
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    clientIp: row.clientIp,
    ipCity: row.ipCity,
    ipRegion: row.ipRegion,
    ipCountry: row.ipCountry,
    ipLocationSource: row.ipLocationSource,
    ipLocationUnavailable: row.ipLocationUnavailable,
    browser: row.browser,
    os: row.os,
    deviceLatitude: row.deviceLatitude,
    deviceLongitude: row.deviceLongitude,
    deviceAccuracyM: row.deviceAccuracyM,
    deviceCapturedAt: row.deviceCapturedAt?.toISOString() ?? null,
    deviceLocationSource: row.deviceLocationSource,
  }
}
