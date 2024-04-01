import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/util/cn.ts"

const variant = cva(
	"text-zinc-400 grid gap-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Root = LabelPrimitive.Root

type LabelProps = VariantProps<typeof variant> &
	ComponentPropsWithoutRef<typeof Root>

const Label = forwardRef<ElementRef<typeof Root>, LabelProps>(
	({ className, ...props }, ref) => (
		<Root ref={ref} className={cn(variant(), className)} {...props} />
	),
)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
