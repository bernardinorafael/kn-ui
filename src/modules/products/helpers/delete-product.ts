import { api } from "@/src/lib/axios"
import { isAxiosError } from "axios"
import { toast } from "sonner"

export async function deleteProduct(productId: string) {
	try {
		await api.delete(`/products/${productId}`)
	} catch (err) {
		if (isAxiosError(err)) {
			toast.error("Ocorreu um erro ao deletear o produto")
		}
	}
}
