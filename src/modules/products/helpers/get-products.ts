import type { OrderByEnum } from "@/src/enum/order-by"
import { api } from "@/src/lib/axios"
import type { Product } from "@/src/types/product"
import { isAxiosError, type AxiosRequestConfig } from "axios"
import { toast } from "sonner"

type ProductsResponse = {
	products: Product[]
}

type ProductQueryParams = {
	disabled: boolean
	orderBy: OrderByEnum
}

export async function getProducts(props: ProductQueryParams) {
	const params: AxiosRequestConfig["params"] = {
		disabled: props.disabled,
		order_by: props.orderBy,
	}

	try {
		const res = await api.get<ProductsResponse>("/products", { params })
		return res.data.products
	} catch (err) {
		if (isAxiosError(err)) {
			toast.error("Ocorreu um erro ao buscar os produtos")
		}
	}
}
