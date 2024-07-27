import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { cn } from "@/src/util/cn"
import { House } from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"

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
				"transition-width self-end p-8 duration-300",
				!sidebar.expanded && "max-w-[1500px]"
			)}
		>
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
				<p className="text-3xl font-bold">under construction</p>
			</div>
		</div>
	)
}
