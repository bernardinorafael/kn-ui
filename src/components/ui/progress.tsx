import * as React from "react"

import { cn } from "@/src/util/cn.ts"
import * as ProgressPrimitive from "@radix-ui/react-progress"

type IndicatorProps = {
	indicatorClassName?: string
}

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & IndicatorProps
>(({ className, indicatorClassName, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
			className
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className={cn(
				"h-full w-full flex-1 bg-primary transition-all",
				indicatorClassName
			)}
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
