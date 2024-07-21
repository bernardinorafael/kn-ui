import { cn } from "@/src/util/cn"

type InputRootProps = React.ComponentPropsWithoutRef<"div">

export function Root({ className, ...props }: InputRootProps) {
	return (
		<div
			className={cn(
				"border-input items-center bg-background ring-offset-background placeholder:text-muted-foreground",
				"focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed flex gap-2",
				"flex h-10 w-full rounded-lg border px-3 focus-within:ring-ring",
				"disabled:opacity-50 dark:text-zinc-300 w-full shadow-sm",
				className
			)}
			{...props}
		/>
	)
}
