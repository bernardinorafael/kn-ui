import { Button } from "@/src/components/ui/button"
import { useSidebar } from "@/src/stores/use-sidebar"
import { cn } from "@/src/util/cn"
import { CaretLeft } from "@phosphor-icons/react"

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
			className={cn(
				"absolute -right-6 top-1/2 h-7 w-7 -translate-y-1/2 shadow",
				!sidebar.expanded && "-right-6"
			)}
			{...props}
		>
			<CaretLeft
				weight="bold"
				className={cn(
					"transition-transform duration-300",
					!sidebar.expanded && "rotate-180"
				)}
			/>
		</Button>
	)
}
