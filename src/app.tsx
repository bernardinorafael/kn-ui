import { routeTree } from '@/src/routeTree.gen'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { queryClient } from '@/src/lib/react-query.ts'
import { Toaster } from '@/src/components/ui/sonner'
import { TooltipProvider } from '@/src/components/ui/tooltip'

import './global.css'
import '@/src/lib/dayjs.ts'

export const router = createRouter({ routeTree })

export function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <NextThemesProvider
        enableSystem
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster />
      </NextThemesProvider>
    </TooltipProvider>
  )
}
