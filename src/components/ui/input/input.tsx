import * as React from "react"

import { cn } from "@/src/util/cn.ts"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"bg-transparent h-full w-full font-medium",
					"text-sm text-zinc-800 file:border-0 file:bg-transparent file:text-sm",
					"focus-visible:outline-none dark:text-zinc-300 select-none",
					props.className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)

Input.displayName = "Input"
