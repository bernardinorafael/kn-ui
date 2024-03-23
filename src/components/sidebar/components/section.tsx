import React from 'react'

import { cn } from '@/src/util/cn.ts'

type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
	title: string
}

export function Section({ className, title, ...rest }: SectionProps) {
	return (
		<section className={cn(className)} {...rest}>
			<h3>{title}</h3>
		</section>
	)
}
