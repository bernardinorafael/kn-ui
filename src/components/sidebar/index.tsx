import { useAuth } from '@/src/stores/use-auth'
import { useSidebar } from '@/src/stores/use-sidebar'
import { useRouterState } from '@tanstack/react-router'
import { Activity, ProfileCircle } from 'iconsax-react'

import { cn } from '@/src/util/cn'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/ui/alert-dialog'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator.tsx'
import { SidebarItem } from '@/src/components/sidebar/components/sidebar-item.tsx'

import { SidebarSection } from './components/sidebar-section'
import { ToggleButton } from './components/toggle-button'

/**
 * IMPORTANT: sidebar icons must be imported from the iconsax package
 */
const routes = [
  { id: 1, label: 'Dashboard', icon: Activity, href: '/dashboard' },
  { id: 2, label: 'Preferências', icon: ProfileCircle, href: '/profile' },
]

export function Sidebar() {
  const signOut = useAuth((store) => store.signOut)
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

  const router = useRouterState()
  const pathname = router.location.pathname

  return (
    <aside
      className={cn('flex h-full w-full max-w-[310px] flex-col p-6 duration-500', {
        'max-w-[80px] px-1': !sidebar.expanded,
      })}
    >
      <div className="relative flex items-center justify-between">
        <p className={cn('text-2xl font-black tracking-tighter')}>kn.co</p>
        <ToggleButton />
      </div>
      <Separator className="my-4" />

      <SidebarSection title="Principal">
        {routes.map(({ id, ...route }) => (
          <SidebarItem key={id} active={pathname === route.href} {...route} />
        ))}
      </SidebarSection>

      {/* TODO: fix profile button user */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" size="lg" className="mt-auto">
            Sair
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>você realmente deseja sair?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={signOut}>Quero sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  )
}
