import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { House } from "@phosphor-icons/react/dist/ssr"
import { createFileRoute } from "@tanstack/react-router"

import { CreateProductForm } from "../modules/products/components/create-product-form"

export const Route = createFileRoute("/_dashboard/products/new")({
	component: NewProductPage,
})

function NewProductPage() {
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<House size={16} />
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Produtos</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Novo</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="text-2xl font-semibold tracking-tight">
				Criar um novo produto
			</h1>

			<CreateProductForm />
		</>
	)
}
