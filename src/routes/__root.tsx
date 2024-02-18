import { Sidebar } from '@/src/components/sidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

function RootComponent() {
  return (
    <div className="flex h-screen items-center antialiased dark:bg-zinc-950">
      <Sidebar />
      <main className="h-screen w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
