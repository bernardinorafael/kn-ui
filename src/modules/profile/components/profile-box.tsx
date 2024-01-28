import React from 'react'

import { cn } from '@/src/util'

type ProfileBoxProps = React.ComponentProps<'section'> & {
  title: string
}

export function ProfileBox({ title, children, className }: ProfileBoxProps) {
  return (
    <section
      className={cn(
        'w-full max-w-[920px] rounded-md border border-zinc-200 bg-zinc-100',
        'dark:border-zinc-800 dark:bg-zinc-900',
        className,
      )}
    >
      <header className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-medium">{title}</h2>
      </header>

      <div>{children}</div>
    </section>
  )
}
