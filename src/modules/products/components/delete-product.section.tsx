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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { deleteProduct } from "../helpers/delete-product"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/src/components/ui/button"
import type { Product } from "@/src/types/product"

type DeleteProductProps = {
	product: Product
}

export function DeleteProductSection({ product }: DeleteProductProps) {
	const navigate = useNavigate({ from: "/products/$id" })
	const { mutateAsync: deleteProductFn } = useMutation({
		mutationFn: deleteProduct,
	})

	async function handleDeleteProduct() {
		await deleteProductFn(product.public_id)
		await navigate({ to: "/products" })
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Excluir produto</CardTitle>
				<CardDescription>
					O produto será marcado como excluído e não ficará disponível no sistema
				</CardDescription>
			</CardHeader>
			<CardContent>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">Quero excluir</Button>
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
							<AlertDialogAction onClick={() => handleDeleteProduct()}>
								Excluir o produto
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	)
}
