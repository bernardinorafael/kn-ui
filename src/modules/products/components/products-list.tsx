import { api } from '@/src/lib/axios'
import { Product } from '@/src/types/product'
import { cn } from '@/src/util'
import { MoreVertical } from 'lucide-react'

export async function ProductsList() {
  const response = await api.get<Product[]>('/products')
  const products = response.data

  return (
    <>
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className={cn(
              'grid grid-cols-4 rounded border border-zinc-200',
              'bg-zinc-100 px-4 py-3 text-sm text-zinc-800 hover:bg-zinc-200',
              'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800',
            )}
          >
            <span>{product.name}</span>
            <span>{product.brand}</span>
            <span>{product.current_stock}</span>

            <button className="ml-auto cursor-default">
              <MoreVertical size={18} />
            </button>
          </div>
        )
      })}
    </>
  )
}
