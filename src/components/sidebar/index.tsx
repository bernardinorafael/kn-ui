import { CaretLeft } from '@phosphor-icons/react'
import { Home3, Notification, ProfileCircle } from 'iconsax-react'

import { Button } from '@/src/components/ui/button.tsx'
import { Separator } from '@/src/components/ui/separator.tsx'
import { Section } from '@/src/components/sidebar/components/section.tsx'
import { SidebarItem } from '@/src/components/sidebar/components/sidebar-item.tsx'

import { ProfileButton } from './components/profile-button'

/**
 * sidebar icons must be from the iconsax package
 */
const routes = [{ id: 2, label: 'Preferências', icon: ProfileCircle }]

export function Sidebar() {
	return (
		<aside className="z-20 flex h-full w-full max-w-[310px] flex-col p-6">
			<div className="relative flex items-center justify-between">
				<p className="text-2xl font-black tracking-tighter">kn.co</p>
				<Button
					variant="outline"
					className="absolute -right-12 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
					size="icon"
				>
					<CaretLeft />
				</Button>
			</div>
			<Separator className="my-3" />
			<Section title="Principal">
				{routes.map((route) => {
					return (
						<SidebarItem
							key={route.id}
							icon={route.icon}
							label={route.label}
							active={route.id === 2}
						/>
					)
				})}
			</Section>
			<ProfileButton />
		</aside>
	)
}
