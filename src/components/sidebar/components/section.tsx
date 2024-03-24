import React from 'react'

import { cn } from '@/src/util/cn.ts'

type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
	title: string
}

export function Section({ className, title, children, ...rest }: SectionProps) {
	return (
		<section className={cn('space-y-2', className)} {...rest}>
			<h3 className="text-xs font-semibold text-zinc-500">{title}</h3>
			<div className="flex flex-col gap-1">{children}</div>
		</section>
	)
}
