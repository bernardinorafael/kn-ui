import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
	component: AuthLayout,
})

/**
 * TODO: put an illustratin conditionally login/registrer page
 */
function AuthLayout() {
	return (
		<div className="grid h-full w-screen grid-cols-2">
			<section className="w-full bg-zinc-300">{/* illustration here */}</section>
			<main className="flex w-full flex-col items-center justify-center space-y-4">
				<Outlet />
			</main>
		</div>
	)
}
