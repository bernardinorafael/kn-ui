import { api } from "@/src/lib/axios"
import type { Product } from "@/src/types/product"
import { isAxiosError } from "axios"
import { toast } from "sonner"

type ProductsResponse = {
	products: Product[]
}

export async function getProducts() {
	try {
		const res = await api.get<ProductsResponse>("/products")
		return res.data.products
	} catch (err) {
		if (isAxiosError(err)) {
			toast.error("Ocorreu um erro ao buscar os produtos")
		}
	}
}
