import "@/src/lib/dayjs"
import "./global.css"

import { routeTree } from "@/src/routeTree.gen.ts"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "sonner"

import { TooltipProvider } from "@/src/components/ui/tooltip"
import { queryClient } from "@/src/lib/react-query.ts"
import { FileProvider } from "./hooks/use-files"

export const router = createRouter({ routeTree })

export function App() {
	return (
		<TooltipProvider delayDuration={100}>
			<NextThemesProvider
				enableSystem
				disableTransitionOnChange
				attribute="class"
				defaultTheme="light">
				<QueryClientProvider client={queryClient}>
					<FileProvider>
						<RouterProvider router={router} />
					</FileProvider>
				</QueryClientProvider>
				<Toaster position="top-right" theme="light" />
			</NextThemesProvider>
		</TooltipProvider>
	)
}
