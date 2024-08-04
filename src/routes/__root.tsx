import { createRootRoute, Outlet } from "@tanstack/react-router"

import { cn } from "../util/cn"

export const Route = createRootRoute({
	component: RootPage,
	// loader: async () => {
	// 	const res = await api.get("/users/me")
	// 	return res.data.user
	// },
})

function RootPage() {
	return (
		<div
			className={cn(
				"flex h-screen flex-col antialiased dark:bg-zinc-950"
				// !user.enabled && "h-[calc(100vh-32px)]"
			)}
		>
			{/* {!user.enabled && (
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
			)} */}
			<Outlet />
		</div>
	)
}
