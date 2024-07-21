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
import { EmptyProductsList } from "../modules/products/components/empty-products-list"
import * as Input from "@/src/components/ui/input/index"
import { MagnifyingGlass } from "@phosphor-icons/react"
import React from "react"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { z } from "zod"

const productSearchSchema = z.object({
	inactive: z.boolean().optional(),
	query: z.string().optional(),
})

export const Route = createFileRoute("/_dashboard/products/")({
	validateSearch: (search) => productSearchSchema.parse(search),
	component: ProductsPage,
	loader: getProducts,
})

function ProductsPage() {
	const navigate = useNavigate({ from: "/products" })
	const search = Route.useSearch()
	const products = Route.useLoaderData()
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	const inputRef = React.useRef<React.ElementRef<"input">>(null)

	React.useEffect(() => {
		function down(event: KeyboardEvent) {
			if (event.key === "/") {
				event.preventDefault()
				inputRef.current?.focus()
			}
		}
		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

	function handleQuerySearchProduct(query: string) {
		navigate({
			search: {
				query: query.length ? query : undefined,
			},
		})
	}

	function handleSearchInactive(checked: boolean) {
		navigate({
			search: {
				inactive: checked,
			},
		})
	}

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

			{products ? (
				<>
					<div className="flex justify-between">
						<div>
							<h1 className="font-semibold text-2xl tracking-tight">
								Meus produtos
							</h1>
							<p className="font-medium text-sm text-zinc-400">
								Visualize e gerencie os produtos
							</p>
						</div>

						<Button
							size="default"
							onClick={() => navigate({ to: "/products/new" })}
							className="ml-auto">
							Criar produto
						</Button>
					</div>

					<div className="flex items-center gap-4">
						<Input.Root className="max-w-[350px]">
							<MagnifyingGlass
								size={16}
								weight="regular"
								className="text-zinc-500"
							/>
							<Input.Input
								ref={inputRef}
								value={search.query}
								onChange={(event) => handleQuerySearchProduct(event.target.value)}
								placeholder="Buscar"
							/>
							<Input.Shortcut>/</Input.Shortcut>
						</Input.Root>

						<Label className="ml-auto flex items-center">
							Ver todos
							<Switch
								checked={search.inactive}
								onCheckedChange={handleSearchInactive}
							/>
						</Label>
					</div>

					<ProductsList products={products} />
				</>
			) : (
				<EmptyProductsList />
			)}
		</div>
	)
}
