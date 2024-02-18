import { Product } from '@/src/types/product'

export const getProduct = async (productId: string): Promise<Product> => {
  const res = await fetch('http://localhost:8080/products/' + productId, {
    cache: 'force-cache',
    next: {
      tags: ['product'],
    },
  })

  if (!res.ok) {
    throw new Error('Product not found')
  }

  return res.json()
}
