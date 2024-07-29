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
import { Fingerprint, IdentificationCard } from "@phosphor-icons/react"
import { House } from "@phosphor-icons/react/dist/ssr"
import {
	createFileRoute,
	Link,
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
						asChild
						variant="ghost"
						size="default"
						className={cn(
							"w-full justify-start gap-2 text-sm font-normal",
							pathname.endsWith("edit") &&
								"bg-accent font-semibold text-accent-foreground"
						)}
					>
						<Link to="/profile/edit">
							<IdentificationCard size={22} />
							Informações pessoais
						</Link>
					</Button>

					<Button
						asChild
						variant="ghost"
						size="default"
						className={cn(
							"w-full justify-start gap-2 text-sm font-normal",
							pathname.endsWith("password") &&
								"bg-accent font-semibold text-accent-foreground"
						)}
					>
						<Link to="/profile/password">
							<Fingerprint size={22} />
							Alterar senha
						</Link>
					</Button>
				</aside>

				<Outlet />
			</div>
		</>
	)
}
