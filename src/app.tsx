import { Toaster } from '@/src/components/ui/sonner'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import { queryClient } from '@/src/lib/react-query.ts'
import { routeTree } from '@/src/routeTree.gen'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import './global.css'

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
