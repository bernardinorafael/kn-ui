import { Toaster } from '@/src/components/ui/sonner'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import { routeTree } from '@/src/routeTree.gen'
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
        <RouterProvider router={router} />
        <Toaster />
      </NextThemesProvider>
    </TooltipProvider>
  )
}
