import React from "react"

import { Sidebar } from "@/src/components/sidebar"
import { cn } from "@/src/util/cn"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { parseCookies } from "nookies"

import { StatusAccountAlert } from "../components/status-account-alert"
import { StatusUser } from "../enum/user-status"
import { api } from "../lib/axios"
import { useAuth } from "../stores/use-auth"
import { useSidebar } from "../stores/use-sidebar"

const cookies = parseCookies()

export const Route = createFileRoute("/_dashboard")({
	component: DashboardLayout,
	loader: async () => {
		const res = await api.get("/users/me")
		return res.data.user
	},
	beforeLoad: () => {
		if (!cookies["kn-token"]) {
			throw redirect({
				to: "/login",
			})
		}
	},
})

function DashboardLayout() {
	const user = Route.useLoaderData()
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	const { getSigned, isSignedIn } = useAuth((store) => ({
		getSigned: store.getSigned,
		isSignedIn: store.isSignedIn,
	}))

	React.useEffect(() => {
		if (!isSignedIn) getSigned()
	}, [])

	const isStatusAlertVisible =
		user.status === StatusUser.Pending || user.status === StatusUser.ActivationSent

	return (
		<div className="relative flex h-screen w-screen flex-col items-center justify-center bg-zinc-100">
			{isStatusAlertVisible && <StatusAccountAlert status={user.status} />}
			<div
				className={cn(
					"relative flex h-full w-screen items-center justify-center bg-zinc-100",
					isStatusAlertVisible && "h-[calc(100vh-42px)]"
				)}
			>
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
		</div>
	)
}
