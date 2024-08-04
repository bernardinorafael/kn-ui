import React from "react"

import { Sidebar } from "@/src/components/sidebar"
import { cn } from "@/src/util/cn"
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router"
import { parseCookies } from "nookies"

import { Button } from "../components/ui/button"
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

	return (
		<div className="relative flex h-screen w-screen flex-col items-center justify-center bg-zinc-100">
			{!user.enabled && (
				<div className="flex h-[32px] w-full items-center justify-center gap-2 bg-yellow-600 text-sm text-white">
					<p>
						Você precisa ativar sua conta para ter acesso a todas as funcionalidades.
					</p>
					<Button
						asChild
						variant="link"
						className="p-0 text-sm font-semibold text-white"
					>
						<Link to="/profile/edit">Ativar agora</Link>
					</Button>
				</div>
			)}
			<div
				className={cn(
					"relative flex h-full w-screen items-center justify-center bg-zinc-100",
					!user.enabled && "h-[calc(100vh-32px)]"
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
