import { cn } from "@/src/util/cn"

type InputRootProps = React.ComponentPropsWithoutRef<"div">

export function Root({ className, ...props }: InputRootProps) {
	return (
		<div
			className={cn(
				"items-center border-input bg-background ring-offset-background placeholder:text-muted-foreground",
				"flex gap-2 focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed",
				"flex h-10 w-full rounded-lg border px-3 focus-within:ring-ring",
				"w-full shadow-sm disabled:opacity-50 dark:text-zinc-300",
				className
			)}
			{...props}
		/>
	)
}
