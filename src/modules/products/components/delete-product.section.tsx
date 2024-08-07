import { Box } from "@/src/components/box"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import { Button } from "@/src/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { OrderByEnum } from "@/src/enum/order-by"
import { api } from "@/src/lib/axios"
import type { Product } from "@/src/types/product"
import { useNavigate } from "@tanstack/react-router"
import { isAxiosError } from "axios"
import { toast } from "sonner"

type DeleteProductProps = {
	product: Product
}

export function DeleteProductSection({ product }: DeleteProductProps) {
	const navigate = useNavigate({ from: "/products/$id" })

	async function handleDeleteProduct(productId: string) {
		try {
			await api.delete(`/products/${productId}`)
			await navigate({
				to: "/products",
				search: { disabled: false, orderBy: OrderByEnum.CreatedAt },
			})
		} catch (err) {
			if (isAxiosError(err)) {
				toast.error("Não foi possível deletar o produto", {
					description: "Tente novamente mais tarde",
				})
			}
		}
	}

	return (
		<Box>
			<Card>
				<CardHeader>
					<CardTitle>Excluir produto</CardTitle>
					<CardDescription>
						O produto será excluído permanentemente e não estará mais disponível no
						sistema.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button>Quero excluir</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Você realmente deseja excluir o produto?
								</AlertDialogTitle>
								<AlertDialogDescription className="uppercase">
									{product.name}
								</AlertDialogDescription>
							</AlertDialogHeader>

							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => handleDeleteProduct(product.public_id)}
								>
									Excluir o produto
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardContent>
			</Card>
		</Box>
	)
}
