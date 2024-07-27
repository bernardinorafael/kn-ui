import { Box } from "@/src/components/box"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { Switch } from "@/src/components/ui/switch"
import { OrderByEnum } from "@/src/enum/order-by"
import { api } from "@/src/lib/axios"
import type { Product } from "@/src/types/product"
import { useRouter } from "@tanstack/react-router"
import { isAxiosError } from "axios"
import { toast } from "sonner"

type DeleteProductProps = {
	product: Product
}

export function ToggleProductStatus({ product }: DeleteProductProps) {
	const router = useRouter()

	async function handleChangeProductStatus(status: boolean) {
		try {
			await api.put(`/products/${product.public_id}/status`, { status })

			if (status === false) {
				router.navigate({
					to: "/products",
					search: { disabled: false, orderBy: OrderByEnum.CreatedAt },
				})
				return
			}

			toast.success("O status do produto foi alterado")
			router.navigate({ to: "/products/$id", params: { id: product.public_id } })
		} catch (err) {
			if (isAxiosError(err)) {
				toast.error("Não foi possível alterar o status do produto")
			}
		}
	}

	return (
		<Box>
			<Card>
				<CardHeader>
					<CardTitle>Ativar o produto</CardTitle>
					<CardDescription>
						Ativando o produto, ele ficará visível na listagem
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Switch
						checked={product.enabled}
						onCheckedChange={handleChangeProductStatus}
					/>
				</CardContent>
			</Card>
		</Box>
	)
}
