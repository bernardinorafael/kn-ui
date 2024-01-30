import { Product } from '@/src/types/product'

export const getProduct = async (productId: string): Promise<Product> => {
  const res = await fetch(`http://localhost:8080/products/${productId}`)

  if (!res.ok) {
    throw new Error('failed to fetch data')
  }

  return res.json()
}
