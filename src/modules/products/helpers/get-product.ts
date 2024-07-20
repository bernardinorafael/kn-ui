import { api } from "@/src/lib/axios"
import type { Product } from "@/src/types/product"
import { isAxiosError } from "axios"
import { toast } from "sonner"

type ProductResponse = {
	product: Product
}

export async function getProduct(productId: string) {
	try {
		const res = await api.get<ProductResponse>(`/products/${productId}`)
		return res.data.product
	} catch (err) {
		if (isAxiosError(err)) {
			toast.error("Ocorreu um erro ao buscar o produto")
		}
	}
}
