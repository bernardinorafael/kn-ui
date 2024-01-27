import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { Breadcrumb } from '../components/breadcrumb'
import { Sidebar } from '../components/sidebar'
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
          <main className="h-full w-full">
            <Breadcrumb />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
