import { useAuth } from '@/src/stores/use-auth'
import { useSidebar } from '@/src/stores/use-sidebar'
import { ProfileCircle } from 'iconsax-react'

import { cn } from '@/src/util/cn'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/src/components/ui/alert-dialog'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator.tsx'
import { SidebarItem } from '@/src/components/sidebar/components/sidebar-item.tsx'

import { SidebarSection } from './components/sidebar-section'
import { ToggleButton } from './components/toggle-button'

/**
 * IMPORTANT: sidebar icons must be imported from the iconsax package
 */
const routes = [{ id: 2, label: 'Preferências', icon: ProfileCircle }]

export function Sidebar() {
	const signOut = useAuth((store) => store.signOut)
	const sidebar = useSidebar((store) => {
		return { expanded: store.expanded }
	})

	return (
		<aside
			className={cn(
				'transition-width flex h-full w-full max-w-[310px] flex-col p-6 duration-500',
				{ 'max-w-[80px] px-1': !sidebar.expanded },
			)}
		>
			<div className="relative flex items-center justify-between">
				<p className={cn('text-2xl font-black tracking-tighter')}>kn.co</p>
				<ToggleButton />
			</div>
			<Separator className="my-4" />

			<SidebarSection title="Principal">
				{routes.map(({ id, ...route }) => (
					<SidebarItem key={id} {...route} />
				))}
			</SidebarSection>

			{/* TODO: fix profile button user */}
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button className="mt-auto">Sair</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>você realmente deseja sair?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={signOut}>quero sair</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</aside>
	)
}
