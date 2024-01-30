type BreadcrumbProps = {
  path: string[]
}

export function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <nav className="flex h-11 items-center border-b border-zinc-300 px-4 dark:border-zinc-800">
      {path.map((element, i) => {
        const isLast = i === path.length - 1
        return (
          <div key={i}>
            <span className="text-xs text-zinc-400">{element}</span>
            {!isLast && <span className="mx-1 text-xs text-zinc-400">/</span>}
          </div>
        )
      })}
    </nav>
  )
}
