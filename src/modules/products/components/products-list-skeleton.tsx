import { Skeleton } from '@/src/components/ui/skeleton'
import { cn } from '@/src/util'

export function ProductsListSkeleton() {
  return (
    <ol className="flex flex-col gap-3">
      {[...Array(6)].map((_, i) => {
        return (
          <li
            key={i}
            className={cn(
              'grid cursor-default grid-cols-4 items-center rounded border border-zinc-200',
              'pointer-events-none h-[46px] bg-zinc-100 px-4 text-sm text-zinc-800 hover:bg-zinc-200',
              'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800',
            )}
          >
            <Skeleton className="h-[20px] w-full max-w-[140px]" />
            <Skeleton className="h-[20px] w-full max-w-[80px]" />
            <Skeleton className="h-[20px] w-full max-w-[110px]" />
            <Skeleton className="h-[20px] w-full max-w-[150px]" />
          </li>
        )
      })}
    </ol>
  )
}
