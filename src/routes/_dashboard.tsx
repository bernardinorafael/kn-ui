import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { parseCookies } from 'nookies'

import { cn } from '@/src/util/cn'
import { Sidebar } from '@/src/components/sidebar'

const { 'kn-token': token } = parseCookies()

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
  beforeLoad: () => {
    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 pt-1.5">
      <Sidebar />
      <main className="h-full w-full overflow-hidden pl-2 pt-2">
        <div
          className={cn(
            'h-screen overflow-y-auto border bg-zinc-950 p-6',
            'rounded-tl-2xl rounded-tr-2xl border-l border-t border-border',
          )}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}
