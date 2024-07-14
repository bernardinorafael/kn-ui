import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { parseCookies } from "nookies"

import { Sidebar } from "@/src/components/sidebar"

import { cn } from "../util/cn"

const { "kn-token": token } = parseCookies()

export const Route = createFileRoute("/_dashboard")({
	component: DashboardLayout,
	beforeLoad: () => {
		if (!token) {
			throw redirect({
				to: "/login",
			})
		}
	},
})

function DashboardLayout() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-zinc-100 pt-1.5">
			<Sidebar />
			<main className="h-full w-full overflow-hidden pt-2 pl-2">
				<div
					className={cn(
						"border border-border border-t border-l",
						"h-screen overflow-y-auto rounded-tl-2xl bg-background p-6 shadow-inner"
					)}>
					<Outlet />
				</div>
			</main>
		</div>
	)
}
