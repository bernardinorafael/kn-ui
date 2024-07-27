import { Sidebar } from "@/src/components/sidebar"
import { cn } from "@/src/util/cn"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { parseCookies } from "nookies"

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
						"h-screen overflow-y-auto border border-l border-t border-border bg-background p-6"
					)}
				>
					<Outlet />
				</div>
			</main>
		</div>
	)
}
