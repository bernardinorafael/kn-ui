import { useSidebar } from '@/src/stores/use-sidebar'
import { Link } from '@tanstack/react-router'
import { type Icon as IconSaxProps } from 'iconsax-react'

import { cn } from '@/src/util/cn'

type SidebarItemProps = {
  href: string
  label: string
  active: boolean
  icon: IconSaxProps
}

export function SidebarItem({ icon: Icon, label, active, href }: SidebarItemProps) {
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

  return (
    <Link
      to={href}
      className={cn(
        'relative flex h-full items-center gap-3 focus-visible:outline-none',
        'h-11 cursor-default text-sm font-medium text-zinc-400 hover:text-white',
      )}
    >
      <Icon
        variant="Bulk"
        color="#d9e3f0"
        className={cn('absolute h-8 w-8 transition-all duration-100', {
          'translate-x-[20px]': !sidebar.expanded,
        })}
      />
      <p
        className={cn('absolute pl-12 pt-1 transition-all', {
          '-z-10 translate-x-[50%]': !sidebar.expanded,
        })}
      >
        {label}
      </p>

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
