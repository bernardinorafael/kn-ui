import "./global.css"
import "@/src/lib/dayjs"

import { routeTree } from "@/src/routeTree.gen.ts"
import { QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "sonner"

import { queryClient } from "@/src/lib/react-query.ts"
import { TooltipProvider } from "@/src/components/ui/tooltip"

export const router = createRouter({ routeTree })

export function App() {
	return (
		<TooltipProvider delayDuration={100}>
			<NextThemesProvider
				enableSystem
				disableTransitionOnChange
				attribute="class"
				defaultTheme="system"
			>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
				<Toaster position="bottom-right" richColors theme="system" />
			</NextThemesProvider>
		</TooltipProvider>
	)
}
