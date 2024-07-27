import * as React from "react"

import { cn } from "@/src/util/cn"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, alignOffset, ...props }, ref) => (
	<TooltipPrimitive.Content
		ref={ref}
		alignOffset={alignOffset}
		sideOffset={sideOffset}
		className={cn(
			"data-[side=top]:slide-in-from-bottom-2",
			"px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-md",
			"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
			"data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2",
			"data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
			"z-50 overflow-hidden rounded-md border bg-popover animate-in fade-in-0 zoom-in-95",
			className
		)}
		{...props}
	/>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
