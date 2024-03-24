import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { parseCookies } from 'nookies'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/src/components/ui/resizable'
import { Sidebar } from '@/src/components/sidebar'

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
		<ResizablePanelGroup direction="horizontal" className="flex h-full w-screen">
			<ResizablePanel defaultSize={22} minSize={6} maxSize={35}>
				<Sidebar />
			</ResizablePanel>
			<ResizableHandle
				withHandle
				onDoubleClick={() => console.log('must change to initial size')}
			/>

			<ResizablePanel defaultSize={78}>
				<main className="z-10 h-screen w-full overflow-y-auto">
					<Outlet />
				</main>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
