import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { useSidebar } from "@/src/stores/use-sidebar.ts"
import { cn } from "@/src/util/cn"
import { CaretLeft, House } from "@phosphor-icons/react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { Button } from "../components/ui/button"
import { OrderByEnum } from "../enum/order-by"
import { DeleteProductSection } from "../modules/products/components/delete-product.section"
import { ToggleProductStatus } from "../modules/products/components/toggle-product.status"
import { getProduct } from "../modules/products/helpers/get-product"

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
				"transition-width self-end p-8 duration-300",
				!sidebar.expanded && "max-w-[1500px]"
			)}
		>
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
				<h1 className="max-w-full overflow-hidden text-ellipsis text-4xl font-semibold uppercase tracking-tight">
					{product?.name}
				</h1>

				<Button
					size="default"
					variant="secondary"
					onClick={() =>
						navigate({
							to: "/products",
							search: {
								disabled: false,
								orderBy: OrderByEnum.CreatedAt,
							},
						})
					}
				>
					<CaretLeft />
					Voltar
				</Button>
			</div>

			{product && (
				<section className="grid grid-cols-2 gap-6">
					<DeleteProductSection product={product} />
					<ToggleProductStatus product={product} />
				</section>
			)}
		</div>
	)
}
