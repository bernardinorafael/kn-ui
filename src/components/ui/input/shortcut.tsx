import { cn } from "@/src/util/cn"

type ShortcutProps = React.ComponentProps<"span">

export function Shortcut({ className, ...props }: ShortcutProps) {
	return (
		<span
			className={cn(
				"rounded-md tracking-widest text-muted-foreground border border-border w-5 h-5",
				"ml-auto text-xs bg-zinc-100 inline-flex items-center justify-center",
				"font-semibold aspect-square font-mono select-none",
				className
			)}
			{...props}
		/>
	)
}
