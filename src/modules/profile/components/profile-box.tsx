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
        className,
      )}
    >
      <header className="border-b border-zinc-200 p-4">
        <h2 className="text-sm font-medium">{title}</h2>
      </header>

      <div>{children}</div>
    </section>
  )
}
