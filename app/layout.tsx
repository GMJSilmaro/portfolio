import type { Metadata } from 'next'
import { Fraunces, Sora, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: 'GMJ. — CV Studio | Gilbert Michael Jay Silmaro',
  description:
    'Interactive CV Studio for Technical Lead Consultant Gilbert Michael Jay Silmaro — SAP Business One, e-Invoice platforms, enterprise delivery, and fullstack web & mobile.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      type: 'image/png',
      sizes: '180x180',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${sora.variable} ${ibmPlexMono.variable} font-sans min-h-screen bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
