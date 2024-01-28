'use client'

import { usePathname } from 'next/navigation'

import { Crown, LogOut } from 'lucide-react'

import { ROUTES } from '../constants/routes'
import { cn } from '../util'
import { SidebarItem } from './sidebar-item'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-[260px] border-r border-zinc-300 dark:border-zinc-800">
      <section
        className={cn(
          'flex h-11 items-center border-b border-zinc-300 px-4 dark:border-zinc-800',
        )}
      >
        <h2 className="text-xl font-semibold">dashboard</h2>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0 dark:border-zinc-800">
        <span className="text-sm font-medium tracking-tight text-zinc-400">
          principal
        </span>
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

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0 dark:border-zinc-800">
        <span className="text-sm font-medium tracking-tight text-zinc-400">
          minha conta
        </span>
        <div className="flex flex-col gap-1">
          <SidebarItem
            href={ROUTES.profile.home}
            isActive={pathname.startsWith(ROUTES.profile.home)}
          >
            preferências
          </SidebarItem>

          <SidebarItem
            href={ROUTES.plan}
            isActive={pathname.startsWith(ROUTES.plan)}
          >
            mudar plano
            <Crown className="text-red-500" size={14} />
          </SidebarItem>
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0 dark:border-zinc-800">
        <SidebarItem href="#">
          <LogOut size={14} />
          sair
        </SidebarItem>
      </section>
    </aside>
  )
}
