import { api } from '@/src/lib/axios.ts'
import { Product } from '@/src/types/product'

export async function fetchProducts() {
  try {
    const response = await api.get<Product[]>('/products')
    return response.data
  } catch (err) {
    console.error(err)
  }
}
