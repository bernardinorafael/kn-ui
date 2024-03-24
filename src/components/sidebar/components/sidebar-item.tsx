import { Link } from '@tanstack/react-router'
import { type Icon as IconSaxProps } from 'iconsax-react'

import { cn } from '@/src/util/cn'

type SidebarItemProps = {
	active?: boolean
	icon: IconSaxProps
	label: string
}

export function SidebarItem({ active, icon: Icon, label }: SidebarItemProps) {
	return (
		<Link
			className={cn(
				'relative flex h-full items-center gap-3 text-sm focus-visible:outline-none',
				'h-11 font-medium text-zinc-400 hover:text-white',
				{ 'text-white': active },
			)}
		>
			<Icon size={28} color="#d9e3f0" variant="Bulk" />
			<p className="pt-1">{label}</p>
		</Link>
	)
}
