import { Sidebar } from '@/src/components/sidebar'
import { cn } from '@/src/util'
import { createRootRoute, Outlet } from '@tanstack/react-router'

function RootComponent() {
  return (
    <div className={cn('h-screen antialiased dark:bg-zinc-950')}>
      <div className="flex h-full items-center">
        <Sidebar />
        <main className="h-screen w-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
