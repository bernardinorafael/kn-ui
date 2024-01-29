import { Product } from '@/src/types/product'

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:8080/products?_sort=-created_at')

  if (!response.ok) {
    throw new Error('failed to fetch data')
  }

  return response.json()
}
