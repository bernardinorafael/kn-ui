import { Product } from '@/src/types/product'

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`http://localhost:8080/products/`)

  if (!response.ok) {
    throw new Error('failed to fetch data')
  }

  return response.json()
}
