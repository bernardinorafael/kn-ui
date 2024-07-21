import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { parseCookies } from "nookies"

import { Sidebar } from "@/src/components/sidebar"
import { cn } from "@/src/util/cn"

const cookies = parseCookies()

export const Route = createFileRoute("/_dashboard")({
	component: DashboardLayout,
	beforeLoad: () => {
		if (!cookies["kn-token"]) {
			throw redirect({
				to: "/login",
			})
		}
	},
})

function DashboardLayout() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-zinc-100">
			<Sidebar />
			<main className="h-full w-full overflow-hidden pl-2">
				<div
					className={cn(
						"border border-border border-t border-l",
						"h-screen overflow-y-auto bg-background p-6"
					)}>
					<Outlet />
				</div>
			</main>
		</div>
	)
}
