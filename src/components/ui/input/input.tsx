import * as React from "react"

import { cn } from "@/src/util/cn.ts"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"h-full w-full bg-transparent font-medium",
					"text-sm text-zinc-800 file:border-0 file:bg-transparent file:text-sm",
					"select-none focus-visible:outline-none dark:text-zinc-300",
					props.className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)

Input.displayName = "Input"
