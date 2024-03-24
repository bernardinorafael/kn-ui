import { Link } from '@tanstack/react-router'
import { type Icon as IconSaxProps } from 'iconsax-react'

import { cn } from '@/src/util/cn'

type SidebarItemProps = {
	isActive?: boolean
	label: string
	icon: IconSaxProps
}

export function SidebarItem({ isActive, icon: Icon, label }: SidebarItemProps) {
	return (
		<Link
			className={cn(
				'relative flex h-full items-center gap-3 text-sm',
				'h-11 font-medium text-zinc-400 hover:text-white',
				{ 'text-white': isActive },
			)}
		>
			<Icon size={26} color="#d9e3f0" variant="Bulk" />
			<p className="pt-1">{label}</p>
			{isActive && (
				<div
					className={cn(
						'absolute -right-6 h-10 w-1 rounded-bl-lg rounded-tl-lg bg-violet-500',
					)}
				/>
			)}
		</Link>
	)
}
