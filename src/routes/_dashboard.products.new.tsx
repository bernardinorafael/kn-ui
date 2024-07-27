import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { useSidebar } from "@/src/stores/use-sidebar.ts"
import { cn } from "@/src/util/cn"
import { House } from "@phosphor-icons/react/dist/ssr"
import { createFileRoute } from "@tanstack/react-router"

import { CreateProductForm } from "../modules/products/components/create-product-form"

export const Route = createFileRoute("/_dashboard/products/new")({
	component: NewProductPage,
})

function NewProductPage() {
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
						<BreadcrumbPage>Novo</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="text-2xl font-semibold tracking-tight">
				Criar um novo produto
			</h1>

			<CreateProductForm />
		</div>
	)
}
