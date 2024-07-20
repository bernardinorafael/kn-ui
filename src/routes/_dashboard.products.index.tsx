import { House } from "@phosphor-icons/react/dist/ssr"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { useSidebar } from "@/src/stores/use-sidebar.ts"
import { cn } from "@/src/util/cn"
import { getProducts } from "../modules/products/helpers/get-products"
import { ProductsList } from "../modules/products/components/products-list"
import { Button } from "../components/ui/button"

export const Route = createFileRoute("/_dashboard/products/")({
	component: ProductsPage,
	loader: getProducts,
})

function ProductsPage() {
	const navigate = useNavigate({ from: "/products" })
	const products = Route.useLoaderData()
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	// const { data: products } = useQuery({
	// 	queryKey: ["products"],
	// 	queryFn: getProducts,
	// })

	return (
		<div
			className={cn(
				"mx-auto w-full max-w-[1292px] space-y-12",
				"self-end p-8 transition-width duration-300",
				!sidebar.expanded && "max-w-[1500px]"
			)}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<House size={16} />
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Produtos</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex justify-between">
				<h1 className="font-semibold text-4xl tracking-tight">Todos os produtos</h1>
				<Button onClick={() => navigate({ to: "/products/new" })} size="default">
					Criar produto
				</Button>
			</div>

			{products && <ProductsList products={products} />}
		</div>
	)
}
