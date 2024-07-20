import { useSidebar } from "@/src/stores/use-sidebar"
import { useRouterState } from "@tanstack/react-router"
import { BoxAdd, ProfileCircle } from "iconsax-react"

import { ProfileButton } from "@/src/components/sidebar/components/profile-button.tsx"
import { SidebarItem } from "@/src/components/sidebar/components/sidebar-item.tsx"
import { ToggleSidebarButton } from "@/src/components/sidebar/components/toggle-sidebar-button.tsx"
import { Separator } from "@/src/components/ui/separator.tsx"
import { cn } from "@/src/util/cn"

/**
 * IMPORTANT: sidebar icons must be imported from the iconsax package
 */
const routes = [
	{ id: 2, label: "Preferências", icon: ProfileCircle, href: "/profile" },
	{ id: 3, label: "Produtos", icon: BoxAdd, href: "/products" },
]

export function Sidebar() {
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	const router = useRouterState()
	const pathname = router.location.pathname

	return (
		<aside
			className={cn(
				"ease flex h-full w-full max-w-[310px] flex-col py-4 pl-2 duration-300",
				{ "max-w-[80px]": !sidebar.expanded }
			)}>
			<div className="relative flex items-center justify-between">
				<span className="pl-3 font-extrabold text-4xl tracking-tighter">kn.</span>
				<ToggleSidebarButton />
			</div>
			<Separator className="my-4" />
			<div className="space-y-2">
				{routes.map(({ id, ...route }) => (
					<SidebarItem
						key={id}
						active={pathname.startsWith(route.href)}
						{...route}
					/>
				))}
			</div>

			<ProfileButton />
		</aside>
	)
}
