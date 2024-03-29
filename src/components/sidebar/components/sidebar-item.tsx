import { useSidebar } from '@/src/stores/use-sidebar'
import { Link } from '@tanstack/react-router'
import { type Icon as IconSaxProps } from 'iconsax-react'

import { cn } from '@/src/util/cn'

type SidebarItemProps = {
  icon: IconSaxProps
  label: string
  href: string
  active: boolean
}

export function SidebarItem({ icon: Icon, label, active, href }: SidebarItemProps) {
  const sidebar = useSidebar((store) => {
    return { expanded: store.expanded }
  })

  return (
    <Link
      to={href}
      className={cn(
        'relative flex h-full items-center gap-3 text-sm focus-visible:outline-none',
        'h-11 cursor-default font-medium text-zinc-400 hover:text-white',
      )}
    >
      <Icon
        color="#d9e3f0"
        variant="Bulk"
        className={cn('h-8 w-8 transition-all', {
          'h-12 w-12 translate-x-[10px] duration-300': !sidebar.expanded,
        })}
      />
      <p className={cn('pt-1', { hidden: !sidebar.expanded })}>{label}</p>

      {active && (
        <div
          className={cn(
            'absolute -right-8 h-9 w-1 rounded-bl-lg rounded-tl-lg bg-violet-500',
            { '-right-3': !sidebar.expanded },
          )}
        />
      )}
    </Link>
  )
}
