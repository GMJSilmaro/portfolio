import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CustomCursor } from './components/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gilbert Michael Jay Silmaro - CV Portfolio',
  description: 'Full-Stack Developer Portfolio showcasing my projects and skills',
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
    <html lang="en" className="scroll-smooth bg-[#0c1b2a]">
      <body className={`${inter.className} min-h-screen bg-[#0c1b2a] text-white cursor-none`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}