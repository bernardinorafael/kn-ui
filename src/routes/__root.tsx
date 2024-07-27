import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
	component: () => (
		<div className="flex h-screen items-center antialiased dark:bg-zinc-950">
			<Outlet />
		</div>
	),
})
