import * as React from 'react'

import { cn } from '@/src/util'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground',
          'flex h-10 w-full rounded-md border px-3 py-2 focus-visible:ring-ring',
          'text-sm text-zinc-800 file:border-0 file:bg-transparent file:text-sm dark:text-zinc-400',
          'focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          'file:font-medium focus-visible:outline-none disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
