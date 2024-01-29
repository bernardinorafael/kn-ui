import { Product } from '@/src/types/product'

export const fetchProducts = async (query: string): Promise<Product[]> => {
  const res = await fetch(`http://localhost:8080/products?q=${query || ''}`)

  if (!res.ok) {
    throw new Error('failed to fetch data')
  }

  return res.json()
}
