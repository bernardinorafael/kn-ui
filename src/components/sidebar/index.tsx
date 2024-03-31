import { useSidebar } from '@/src/stores/use-sidebar'
import { useRouterState } from '@tanstack/react-router'
import { Activity, ProfileCircle } from 'iconsax-react'

import { cn } from '@/src/util/cn'
import { Separator } from '@/src/components/ui/separator.tsx'
import { SidebarItem } from '@/src/components/sidebar/components/sidebar-item.tsx'

import { ProfileButton } from './components/profile-button'
import { ToggleButton } from './components/toggle-button'

/**
 * IMPORTANT: sidebar icons must be imported from the iconsax package
 */
const routes = [
  { id: 1, label: 'Dashboard', icon: Activity, href: '/dashboard' },
  { id: 2, label: 'Preferências', icon: ProfileCircle, href: '/profile' },
]

export function Sidebar() {
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

  const router = useRouterState()
  const pathname = router.location.pathname

  return (
    <aside
      className={cn(
        'ease flex h-full w-full max-w-[310px] flex-col p-6 duration-300',
        { 'max-w-[80px] px-1': !sidebar.expanded },
      )}
    >
      <div className="relative flex items-center justify-between">
        <p className="select-none text-2xl font-black tracking-tighter">kn.co</p>
        <ToggleButton />
      </div>
      <Separator className="my-4" />

      <div className="space-y-2">
        {routes.map(({ id, ...route }) => (
          <SidebarItem key={id} active={pathname === route.href} {...route} />
        ))}
      </div>

      <ProfileButton />
    </aside>
  )
}
