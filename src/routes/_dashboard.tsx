import React from "react"

import { Sidebar } from "@/src/components/sidebar"
import { cn } from "@/src/util/cn"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { parseCookies } from "nookies"

import { useAuth } from "../stores/use-auth"
import { useSidebar } from "../stores/use-sidebar"

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
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	const { getSigned, isSignedIn } = useAuth((store) => ({
		getSigned: store.getSigned,
		isSignedIn: store.isSignedIn,
	}))

	React.useEffect(() => {
		if (!isSignedIn) getSigned()
	}, [])

	return (
		<div className="relative flex h-screen w-screen items-center justify-center bg-zinc-100">
			<Sidebar />
			<main className="h-full w-full overflow-hidden pl-2">
				<div className="h-screen overflow-y-auto border border-l border-t border-border bg-background p-6">
					<div
						className={cn(
							"transition-width mx-auto w-full max-w-[1292px] space-y-12 self-end p-8 duration-300",
							!sidebar.expanded && "max-w-[1500px]"
						)}
					>
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	)
}
