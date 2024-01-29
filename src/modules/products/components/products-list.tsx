import Link from 'next/link'

import { ROUTES } from '@/src/constants/routes'
import { api } from '@/src/lib/axios'
import { Product } from '@/src/types/product'
import { cn, formatCurrency } from '@/src/util'

export async function ProductsList() {
  const response = await api.get<Product[]>('/products', {
    params: { _sort: '-created_at' },
  })

  return (
    <>
      {response.data.map((product) => {
        return (
          <Link
            href={`${ROUTES.product.edit}/${product.id}`}
            key={product.id}
            className={cn(
              'grid cursor-default grid-cols-4 rounded border border-zinc-200',
              'bg-zinc-100 px-4 py-3 text-sm text-zinc-800 hover:bg-zinc-200',
              'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800',
              { 'pointer-events-none opacity-30': product.active === false },
            )}
          >
            <span>{product.name}</span>
            <span>{product.current_stock}</span>
            <span>{formatCurrency(product.price)}</span>
            <span className="ml-auto">{product.active ? `ativo` : `inativo`}</span>
          </Link>
        )
      })}
    </>
  )
}
