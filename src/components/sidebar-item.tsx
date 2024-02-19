import React from 'react'

import { Link } from '@tanstack/react-router'

import { cn } from '../util'

type SidebarItemProps = React.ComponentProps<typeof Link>

export function SidebarItem(props: SidebarItemProps) {
  const { className, ...rest } = props

  return (
    <Link
      className={cn(
        'flex cursor-default items-center text-zinc-500 hover:text-black',
        'flex items-center gap-2 pt-1 text-sm font-medium',
        'dark:hover:text-white',
        className,
      )}
      {...rest}
    />
  )
}
