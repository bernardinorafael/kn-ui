import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { parseCookies } from 'nookies'

import { Sidebar } from '@/src/components/sidebar'

import { cn } from '../util/cn'

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
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-100 pt-1.5">
      <Sidebar />
      <main className="h-full w-full overflow-hidden pl-2 pt-2">
        <div
          className={cn(
            'border-l border-t border-border bg-background p-6',
            'h-screen overflow-y-auto rounded-tl-2xl border',
          )}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}
