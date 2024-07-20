import { House } from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { cn } from "@/src/util/cn"

import { useSidebar } from "../stores/use-sidebar"

export const Route = createFileRoute("/_dashboard/dashboard")({
	component: ProfilePage,
})

function ProfilePage() {
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	return (
		<div
			className={cn(
				"mx-auto w-full max-w-[1292px] space-y-12",
				"self-end p-8 transition-width duration-300",
				!sidebar.expanded && "max-w-[1500px]"
			)}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<House size={16} />
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex h-full w-full items-center justify-center">
				<p className="font-bold text-3xl">under construction</p>
			</div>
		</div>
	)
}
