function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getOwnerEmail(): string {
  return required('OWNER_EMAIL').trim().toLowerCase()
}

/** Returns null when owner env is not configured (fail closed for auth gates). */
export function tryGetOwnerEmail(): string | null {
  const value = process.env.OWNER_EMAIL?.trim().toLowerCase()
  return value || null
}

export function getOwnerPasswordHash(): string {
  return required('OWNER_PASSWORD_HASH')
}

export function getAuthSecret(): string {
  return required('AUTH_SECRET')
}

export function getCronSecret(): string | undefined {
  return process.env.CRON_SECRET
}
