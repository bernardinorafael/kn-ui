'use client'

import { usePathname } from 'next/navigation'

import { LogOut } from 'lucide-react'

import { ROUTES } from '../constants/routes'
import { SidebarItem } from './sidebar-item'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-[260px] border-r border-zinc-300">
      <section className="flex h-11 items-center border-b border-zinc-300 px-4">
        <h2 className="text-xl font-semibold">dashboard</h2>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0">
        <span className="text-sm font-medium text-zinc-400">principal</span>
        <div className="flex flex-col gap-1">
          <SidebarItem
            href={ROUTES.dashboard}
            isActive={pathname.endsWith(ROUTES.dashboard)}
          >
            dashboard
          </SidebarItem>

          <SidebarItem
            href={ROUTES.product.home}
            isActive={pathname.startsWith(ROUTES.product.home)}
          >
            produtos
          </SidebarItem>
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0">
        <span className="text-sm font-medium text-zinc-400">minha conta</span>
        <div className="flex flex-col gap-1">
          <SidebarItem href="#">preferências</SidebarItem>
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0">
        <SidebarItem href="#">
          <LogOut size={14} />
          sair
        </SidebarItem>
      </section>
    </aside>
  )
}
