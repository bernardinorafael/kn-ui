import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { House } from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/dashboard")({
	component: ProfilePage,
})

function ProfilePage() {
	return (
		<>
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
		</>
	)
}
