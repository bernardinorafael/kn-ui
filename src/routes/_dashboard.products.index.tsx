import React from "react"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import * as Input from "@/src/components/ui/input/index"
import { useSidebar } from "@/src/stores/use-sidebar.ts"
import { cn } from "@/src/util/cn"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { House } from "@phosphor-icons/react/dist/ssr"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { z } from "zod"

import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select"
import { Switch } from "../components/ui/switch"
import { OrderByEnum } from "../enum/order-by"
import { EmptyProductsList } from "../modules/products/components/empty-products-list"
import { ProductsList } from "../modules/products/components/products-list"
import { getProducts } from "../modules/products/helpers/get-products"

const searchParamsSchema = z.object({
	disabled: z.boolean().default(false),
	orderBy: z.nativeEnum(OrderByEnum).default(OrderByEnum.CreatedAt),
	q: z.string().optional(),
})

export const Route = createFileRoute("/_dashboard/products/")({
	component: ProductsPage,
	validateSearch: searchParamsSchema.parse,
	loaderDeps: ({ search }) => ({
		disabled: search.disabled,
		orderBy: search.orderBy,
	}),
	loader: ({ deps }) => {
		return getProducts({
			disabled: deps.disabled,
			orderBy: deps.orderBy,
		})
	},
})

function ProductsPage() {
	const search = Route.useSearch()
	const products = Route.useLoaderData()
	const navigate = useNavigate({ from: "/products" })
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

	function handleQuerySearch(event: React.ChangeEvent<HTMLInputElement>) {
		navigate({ search: { ...search, q: event.target.value } })
	}

	function handleSearchDeleted(checked: boolean) {
		navigate({
			search: { ...search, disabled: checked },
		})
	}

	function handleSelectOrderByList(orderBy: OrderByEnum) {
		navigate({
			search: { ...search, orderBy },
		})
	}

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
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Meus produtos</h1>
					<p className="text-sm font-medium text-zinc-400">
						Visualize e gerencie os produtos
					</p>
				</div>

				<Button
					size="default"
					onClick={() => navigate({ to: "/products/new" })}
					className={cn("ml-auto", !products && "hidden")}
				>
					Criar produto
				</Button>
			</div>

			<div className="flex items-center gap-4">
				<Input.Root className="max-w-[350px]">
					<MagnifyingGlass size={16} weight="regular" className="text-zinc-500" />
					<Input.Input
						ref={inputRef}
						value={search.q}
						onChange={handleQuerySearch}
						placeholder="Buscar"
					/>
					<Input.Shortcut>/</Input.Shortcut>
				</Input.Root>

				<Select
					defaultValue={search.orderBy}
					onValueChange={handleSelectOrderByList}
				>
					<SelectTrigger className="w-[190px] gap-1">
						<p className="font-semibold">Ordernar:</p>
						<SelectValue placeholder="Ordernar por" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={OrderByEnum.CreatedAt}>Criado em</SelectItem>
						<SelectItem value={OrderByEnum.Quantity}>Quantidade</SelectItem>
						<SelectItem value={OrderByEnum.Price}>Preço</SelectItem>
					</SelectContent>
				</Select>

				<Label className="ml-auto flex items-center">
					Ver inativos
					<Switch checked={search.disabled} onCheckedChange={handleSearchDeleted} />
				</Label>
			</div>

			{products ? <ProductsList products={products} /> : <EmptyProductsList />}
		</div>
	)
}
