'use client'

import { usePathname } from 'next/navigation'

export function Breadcrumb() {
  const pathname = usePathname()

  const mappedPath: Record<string, string> = {
    products: 'produtos',
    new: 'criar produto',
    dashboard: 'dashboard',
    profile: 'minha conta',
    plan: 'meu plano',
    edit: 'editar produto',
  }

  const pathnames = pathname.split('/').slice(1)

  return (
    <nav className="flex h-11 items-center border-b border-zinc-300 px-4 dark:border-zinc-800">
      {pathnames.map((element, i) => {
        const isLast = i === pathnames.length - 1
        return (
          <div key={i}>
            <span className="text-xs text-zinc-400">{`${mappedPath[element]}`}</span>
            {!isLast && <span className="mx-1 text-xs text-zinc-400">/</span>}
          </div>
        )
      })}
    </nav>
  )
}
