import { prisma } from '@/lib/db'

const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 8

/** Returns true when this IP should be blocked from further login attempts. */
export async function isLoginRateLimited(clientIp: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MS)
  const failures = await prisma.loginAttempt.count({
    where: {
      clientIp,
      success: false,
      createdAt: { gte: since },
    },
  })
  return failures >= MAX_FAILURES
}

export async function recordLoginAttempt(
  clientIp: string,
  success: boolean,
): Promise<void> {
  await prisma.loginAttempt.create({
    data: { clientIp, success },
  })

  // Opportunistic cleanup of old attempts (keep ~24h).
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
  await prisma.loginAttempt.deleteMany({
    where: { createdAt: { lt: cutoff } },
  })
}
