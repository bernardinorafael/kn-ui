import { Sidebar } from '@/src/components/sidebar.tsx'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <main className="h-screen w-full overflow-y-auto">
        <Outlet />
      </main>
    </>
  )
}
