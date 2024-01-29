'use client'

import { TooltipProvider } from '@/src/components/ui/tooltip'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

type ProviderProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProviderProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <NextThemesProvider
        enableSystem
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
      >
        {children}
      </NextThemesProvider>
    </TooltipProvider>
  )
}
