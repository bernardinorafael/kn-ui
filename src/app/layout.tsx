import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { Breadcrumb } from '../components/breadcrumb'
import { Sidebar } from '../components/sidebar'
import { Toaster } from '../components/ui/sonner'
import { ThemeProvider } from '../provider/theme-provider'
import { cn } from '../util'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'unknown',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn('h-screen antialiased dark:bg-zinc-950', inter.className)}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute="class"
          defaultTheme="system"
        >
          <div className="flex h-full items-center">
            <Sidebar />
            <div className="h-screen w-full overflow-y-auto">
              <Breadcrumb />
              {children}
            </div>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
