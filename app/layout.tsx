import type { Metadata } from 'next'
import { Lora, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '../components/Providers'
import { cn } from '@/lib/utils'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpeakOUT Engagements',
  description: 'SpeakOUT engagements sign up and management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "h-full")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
