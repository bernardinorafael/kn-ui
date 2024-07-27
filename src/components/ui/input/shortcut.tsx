import { cn } from "@/src/util/cn"

type ShortcutProps = React.ComponentProps<"span">

export function Shortcut({ className, ...props }: ShortcutProps) {
	return (
		<span
			className={cn(
				"h-5 w-5 rounded-md border border-border tracking-widest text-muted-foreground",
				"ml-auto inline-flex items-center justify-center bg-zinc-100 text-xs",
				"aspect-square select-none font-mono font-semibold",
				className
			)}
			{...props}
		/>
	)
}
