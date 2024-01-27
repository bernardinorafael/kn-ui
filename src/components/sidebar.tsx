'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '../constants/routes'
import { SidebarItem } from './sidebar-item'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-[320px] border-r border-zinc-300">
      <section className="flex h-11 items-center border-b border-zinc-300 px-4">
        <h2 className="text-2xl font-semibold">dashboard</h2>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0">
        <span className="text-sm font-medium text-zinc-400">principal</span>
        <div className="flex flex-col gap-1">
          <SidebarItem
            label="dashboard"
            href={ROUTES.home}
            isActive={pathname.endsWith(ROUTES.home)}
          />
          <SidebarItem
            label="produtos"
            href={ROUTES.product.home}
            isActive={pathname.startsWith(ROUTES.product.home)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0">
        <span className="text-sm font-medium text-zinc-400">contas</span>
        <div className="flex flex-col gap-1">
          <SidebarItem label="preferências" href="#" />
          <SidebarItem label="gerenciar acessos" href="#" />
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0">
        <SidebarItem label="sair" href="#" />
      </section>
    </aside>
  )
}
