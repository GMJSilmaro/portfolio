import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CustomCursor } from './components/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gilbert Michael Jay Silmaro - Portfolio',
  description: 'Full-Stack Developer Portfolio showcasing my projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0c1b2a] text-white cursor-none`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}