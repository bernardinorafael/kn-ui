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
        'group relative flex items-center p-3 text-sm focus-visible:outline-none',
        'h-10 cursor-default rounded-lg font-medium text-secondary-foreground/80',
        { 'bg-background shadow': active },
      )}
    >
      <Icon
        variant="Bulk"
        className={cn(
          'absolute h-8 w-8 transition-all duration-100 group-active:scale-90',
          { 'translate-x-[8px]': !sidebar.expanded },
        )}
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
