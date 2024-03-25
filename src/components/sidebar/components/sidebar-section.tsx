import React from 'react'

import { useSidebar } from '@/src/stores/use-sidebar'

import { cn } from '@/src/util/cn.ts'

type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
	title: string
}

export function SidebarSection({ title, children, ...rest }: SectionProps) {
	const sidebar = useSidebar((store) => {
		return { expanded: store.expanded }
	})

	return (
		<section className={cn('space-y-4')} {...rest}>
			<h3
				className={cn('text-xs font-semibold text-zinc-500', {
					'translate-x-[10px] duration-300': !sidebar.expanded,
				})}
			>
				{title}
			</h3>
			<div className="flex flex-col gap-1">{children}</div>
		</section>
	)
}
