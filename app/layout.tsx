import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Gilbert Michael Jay Silmaro - Technical Lead Consultant',
  description:
    'Technical Lead Consultant and Software Engineer specializing in SAP Business One integration, e-Invoice compliance platforms, enterprise system integration, and fullstack web and mobile development.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      }
    ],
    apple: {
      url: '/apple-touch-icon.png',
      type: 'image/png',
      sizes: '180x180'
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
      <body className={`${inter.variable} font-sans min-h-screen bg-navy-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
