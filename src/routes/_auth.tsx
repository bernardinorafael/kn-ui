import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
	component: AuthLayout,
})

function AuthLayout() {
	return (
		<>
			<main className="flex h-screen w-full items-center justify-center">
				<section className="flex w-full max-w-[370px] flex-col gap-6">
					<Outlet />
				</section>
			</main>
		</>
	)
}
