import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { Breadcrumb } from '../components/breadcrumb'
import { Sidebar } from '../components/sidebar'
import { Toaster } from '../components/ui/sonner'
import { cn } from '../util'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'unknown',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={cn('h-screen antialiased', inter.className)}>
        <div className="flex h-full items-center">
          <Sidebar />
          <div className="h-screen w-full overflow-y-auto">
            <Breadcrumb />
            {children}
          </div>
        </div>

        <Toaster />
      </body>
    </html>
  )
}
