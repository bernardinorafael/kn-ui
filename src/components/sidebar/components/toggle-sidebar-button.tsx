import { useSidebar } from "@/src/stores/use-sidebar"
import { CaretLeft } from "@phosphor-icons/react"

import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/util/cn"

type ButtonProps = React.ComponentPropsWithRef<typeof Button>

export function ToggleSidebarButton(props: ButtonProps) {
	const sidebar = useSidebar((store) => ({
		expanded: store.expanded,
		toggle: store.toggle,
	}))

	return (
		<Button
			size="icon"
			variant="outline"
			onClick={sidebar.toggle}
			className={cn("-right-6 -translate-y-1/2 absolute top-1/2 h-7 w-7 shadow", {
				"-right-6": !sidebar.expanded,
			})}
			{...props}>
			<CaretLeft
				weight="bold"
				className={cn("transition-transform duration-300", {
					"rotate-180": !sidebar.expanded,
				})}
			/>
		</Button>
	)
}
