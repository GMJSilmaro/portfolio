#!/usr/bin/env node
/**
 * Generate a bcrypt hash for OWNER_PASSWORD_HASH.
 * Usage: node scripts/hash-password.mjs "your-password"
 * Never commit the plaintext password.
 */
import { hash } from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "<password>"')
  process.exit(1)
}

const hashed = await hash(password, 12)
console.log(hashed)
