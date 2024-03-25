import { useSidebar } from '@/src/stores/use-sidebar'
import { CaretLeft } from '@phosphor-icons/react'

import { cn } from '@/src/util/cn'
import { Button } from '@/src/components/ui/button'

type ButtonProps = React.ComponentPropsWithRef<typeof Button>

export function ToggleButton(props: ButtonProps) {
	const sidebar = useSidebar((store) => {
		return { expanded: store.expanded, toggle: store.toggle }
	})

	return (
		<Button
			size="icon"
			variant="outline"
			onClick={sidebar.toggle}
			className={cn(
				'absolute -right-12 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full shadow-lg',
				{ '-right-8': !sidebar.expanded },
			)}
			{...props}
		>
			<CaretLeft
				weight="bold"
				className={cn('transition-transform duration-500', {
					'rotate-180': !sidebar.expanded,
				})}
			/>
		</Button>
	)
}
