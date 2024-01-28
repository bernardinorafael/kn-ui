'use client'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { toast } from 'sonner'

type ProviderProps = {
  children: React.ReactNode
}

let displayedNetworkFailureError = false

export default function Providers({ children }: ProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry(failureCount) {
              if (failureCount >= 3) {
                if (displayedNetworkFailureError === false) {
                  displayedNetworkFailureError = true
                  toast.error('ocorreu um erro de conexão!', {
                    description: 'tente novamente em alguns instantes.',
                  })
                }
                return false
              }
              return true
            },
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        enableSystem
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
