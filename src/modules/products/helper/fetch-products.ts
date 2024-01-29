import { Product } from '@/src/types/product'

export const fetchProducts = async (query: string): Promise<Product[]> => {
  const q = query || ''

  const res = await fetch(
    `http://localhost:8080/products?q=${q}&_sort=created_at&_order=desc`,
  )

  if (!res.ok) {
    throw new Error('failed to fetch data')
  }

  return res.json()
}
