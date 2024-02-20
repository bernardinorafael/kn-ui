import { Button } from '@/src/components/ui/button.tsx'
import { CaretLeft } from '@phosphor-icons/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center">
        <section className="flex h-full w-full items-center justify-center p-4">
          <Button className="absolute left-7 top-10" size="default" variant="ghost">
            <CaretLeft size={16} weight="bold" />
            voltar
          </Button>

          <div className="flex w-full max-w-[370px] flex-col gap-6">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  )
}
