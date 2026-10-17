import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    lastLoginActivityId?: string | null
  }

  interface Session {
    user: {
      email?: string | null
      name?: string | null
      lastLoginActivityId?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    lastLoginActivityId?: string | null
  }
}
