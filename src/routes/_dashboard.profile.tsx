import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { Button } from "@/src/components/ui/button"
import { useSidebar } from "@/src/stores/use-sidebar.ts"
import { cn } from "@/src/util/cn"
import { House } from "@phosphor-icons/react/dist/ssr"
import { createFileRoute } from "@tanstack/react-router"

import { UpdateProfileForm } from "../modules/profile/components/update-profile-form"

export const Route = createFileRoute("/_dashboard/profile")({
	component: ProfilePage,
})

const items = ["Informações pessoais", "Atualizar senha"]

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
						<BreadcrumbPage>Preferências</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex items-start gap-12">
				<aside className="flex w-full max-w-[320px] flex-col items-start">
					{items.map((item) => (
						<Button
							key={item}
							variant="ghost"
							className="w-full justify-start text-base font-normal"
						>
							{item}
						</Button>
					))}
				</aside>

				<UpdateProfileForm />
			</div>
		</div>
	)
}
