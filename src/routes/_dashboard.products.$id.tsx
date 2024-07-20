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
import { getProduct } from "../modules/products/helpers/get-product"
import { Button } from "../components/ui/button"
import { CaretLeft } from "@phosphor-icons/react"
import { DeleteProductSection } from "../modules/products/components/delete-product.section"

export const Route = createFileRoute("/_dashboard/products/$id")({
	loader: ({ params }) => getProduct(params.id),
	component: ProductPage,
})

function ProductPage() {
	const navigate = useNavigate({ from: "/products/$id" })
	const product = Route.useLoaderData()

	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

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
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="uppercase">{product?.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex items-center justify-between gap-6">
				<h1 className="max-w-full overflow-hidden text-ellipsis font-semibold text-4xl uppercase tracking-tight">
					{product?.name}
				</h1>

				<Button
					size="default"
					variant="secondary"
					onClick={() => navigate({ to: "/products" })}>
					<CaretLeft />
					Voltar
				</Button>
			</div>

			{product && (
				<section className="grid grid-cols-2">
					<DeleteProductSection product={product} />
				</section>
			)}
		</div>
	)
}
