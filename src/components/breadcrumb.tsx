'use client'

import { usePathname } from 'next/navigation'

export function Breadcrumb() {
  const pathname = usePathname()

  const mappedPath: Record<string, string> = {
    products: 'produtos',
    new: 'criar produto',
    dashboard: 'dashboard',
    profile: 'minha conta',
  }

  const pathnames = pathname.split('/').slice(1)

  return (
    <nav className="flex h-11 items-center border-b border-zinc-300 px-4">
      {pathnames.map((element, i) => {
        const isLast = i === pathnames.length - 1
        return (
          <>
            <span key={i} className="text-xs text-zinc-400">
              {`${mappedPath[element]}`}
            </span>
            {!isLast && <span className="mx-1 text-xs text-zinc-400"> / </span>}
          </>
        )
      })}
    </nav>
  )
}
