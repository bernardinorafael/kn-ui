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
        'relative flex h-11 items-center p-3 text-sm font-medium focus-visible:outline-none',
        'cursor-default rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white',
        { 'bg-zinc-800 text-white': active },
      )}
    >
      <Icon
        variant="Bulk"
        color="#d9e3f0"
        className={cn('absolute h-8 w-8 transition-all duration-100', {
          'translate-x-[8px]': !sidebar.expanded,
        })}
      />
      <p
        className={cn('absolute pl-12 pt-1 transition-all', {
          '-z-10 translate-x-[50%]': !sidebar.expanded,
        })}
      >
        {label}
      </p>
    </Link>
  )
}
