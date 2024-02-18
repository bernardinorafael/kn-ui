import { api } from '@/src/lib/axios.ts'
import { Product } from '@/src/types/product'

type GetProductsParams = {
  query: string
}

export async function getProducts({ query }: GetProductsParams) {
  try {
    const response = await api.get<Product[]>('/products', {
      params: {
        q: query,
      },
    })

    return response.data
  } catch (err) {
    console.error(err)
  }
}