import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center">
        <Outlet />
      </main>
    </>
  )
}
