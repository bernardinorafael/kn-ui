import { CaretLeft } from '@phosphor-icons/react'
import { Home3, ProfileCircle } from 'iconsax-react'

import { Button } from '@/src/components/ui/button.tsx'
import { Separator } from '@/src/components/ui/separator.tsx'
import { Section } from '@/src/components/sidebar/components/section.tsx'
import { SidebarItem } from '@/src/components/sidebar/components/sidebar-item.tsx'

const routes = [
	{ id: 1, label: 'Home', icon: Home3 },
	{ id: 2, label: 'Preferências', icon: ProfileCircle },
]

export function Sidebar() {
	return (
		<aside className="z-20 h-full w-full border-r p-6">
			<div className="flex items-center justify-between">
				<p className="text-2xl font-black tracking-tighter">kn.co</p>
				<Button variant="outline" size="icon" className="h-7 w-7">
					<CaretLeft />
				</Button>
			</div>

			<Separator className="my-3" />

			<Section title="Principal">
				{routes.map((route) => {
					return (
						<SidebarItem
							isActive={route.id === 2}
							key={route.id}
							icon={route.icon}
							label={route.label}
						/>
					)
				})}
			</Section>
		</aside>
	)
}
