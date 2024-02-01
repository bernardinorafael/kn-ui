import Link from 'next/link'

import { ROUTES } from '@/src/constants/routes'
import { cn, formatCurrency } from '@/src/util'

import { fetchProducts } from '../helper/fetch-products'

type ProductsListProps = {
  query: string
}

export async function ProductsList({ query }: ProductsListProps) {
  const products = await fetchProducts(query)

  return (
    <ol className="flex flex-col gap-3">
      {products.length > 0 ? (
        products.map((product) => {
          return (
            <li key={product.id}>
              <Link
                href={`${ROUTES.product.edit}/${product.id}`}
                className={cn(
                  'grid cursor-default grid-cols-4 rounded border border-zinc-200',
                  'bg-zinc-100 px-4 py-3 text-sm text-zinc-800 hover:bg-zinc-200',
                  'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800',
                )}
              >
                <span>{product.name}</span>
                <span>
                  {product.current_stock} / {product.stock}
                </span>
                <span>{formatCurrency(product.price)}</span>
                <span className="ml-auto">
                  {product.active ? `ativo` : `inativo`}
                </span>
              </Link>
            </li>
          )
        })
      ) : (
        <div className="flex w-full flex-col items-center justify-center rounded-lg border p-10">
          <h2 className="text-xl font-semibold">nenhum resultado encontrado.</h2>
          <p className="text-zinc-500 dark:text-zinc-200">
            você pesquisou por: <strong>{query}</strong>
          </p>
        </div>
      )}
    </ol>
  )
}
