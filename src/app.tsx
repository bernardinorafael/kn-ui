import { routeTree } from '@/src/routeTree.gen.ts'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { queryClient } from '@/src/lib/react-query.ts'

import './global.css'
import '@/src/lib/dayjs'

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
				<Toaster position="top-right" richColors theme="system" />
			</NextThemesProvider>
		</TooltipProvider>
	)
}
