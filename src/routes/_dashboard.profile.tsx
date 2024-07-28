import React from "react"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/util/cn"
import { House } from "@phosphor-icons/react/dist/ssr"
import {
	createFileRoute,
	Outlet,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router"

export const Route = createFileRoute("/_dashboard/profile")({
	component: ProfilePage,
})

function ProfilePage() {
	const navigate = useNavigate({ from: "/profile" })

	const router = useRouterState()
	const pathname = router.location.pathname

	React.useEffect(() => {
		navigate({ to: "/profile/edit" })
	}, [])

	return (
		<>
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
				<aside className="flex w-full max-w-[320px] flex-col items-start gap-1">
					<Button
						variant="ghost"
						onClick={() => navigate({ to: "/profile/edit" })}
						className={cn(
							"w-full justify-start text-base font-normal",
							pathname.endsWith("edit") && "bg-accent text-accent-foreground"
						)}
					>
						Informações pessoais
					</Button>

					<Button
						variant="ghost"
						onClick={() => navigate({ to: "/profile/recover" })}
						className={cn(
							"w-full justify-start text-base font-normal",
							pathname.endsWith("recover") && "bg-accent text-accent-foreground"
						)}
					>
						Alterar senha
					</Button>
				</aside>

				<Outlet />
			</div>
		</>
	)
}
