import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { parseCookies } from 'nookies'

import { Sidebar } from '@/src/components/sidebar.tsx'

const { 'kn-token': token } = parseCookies()

export const Route = createFileRoute('/_dashboard')({
	component: DashboardLayout,
	beforeLoad: () => {
		if (!token) {
			throw redirect({
				to: '/login',
			})
		}
	},
})

function DashboardLayout() {
	return (
		<>
			<Sidebar />
			<main className="h-screen w-full overflow-y-auto">
				<Outlet />
			</main>
		</>
	)
}
