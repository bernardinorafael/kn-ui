import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { useSidebar } from "@/src/stores/use-sidebar"
import type { Product } from "@/src/types/product"
import { cn } from "@/src/util/cn"
import { formatCurrency } from "@/src/util/format-currency"
import { formatDate } from "@/src/util/format-date"
import { CameraSlash } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

type ProductCardProps = {
	products: Product[]
}

export function ProductsList({ products }: ProductCardProps) {
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	return (
		<section className="space-y-4">
			{products.map((product) => {
				return (
					<div
						key={product.public_id}
						className="flex w-full select-none items-center gap-6"
					>
						<Link to="/products/$id" params={{ id: product.public_id }}>
							<Avatar className="h-16 w-16 rounded-lg transition-all duration-200 hover:scale-110">
								<AvatarImage src={product.image} />
								<AvatarFallback className="rounded-lg">
									<CameraSlash weight="fill" size={19} />
								</AvatarFallback>
							</Avatar>
						</Link>

						<div className="flex w-full flex-col">
							<p className="text-xs font-medium text-zinc-400">Nome</p>
							<Link
								to="/products/$id"
								params={{ id: product.public_id }}
								className={cn(
									"self-start overflow-hidden text-ellipsis whitespace-nowrap uppercase",
									"flex items-center gap-2 font-medium hover:underline hover:underline-offset-4"
								)}
							>
								{product.name}
							</Link>
						</div>

						<div
							className={cn(
								"grid w-full max-w-[150px] transition-all duration-200",
								!sidebar.expanded && "max-w-[270px]"
							)}
						>
							<p className="text-xs font-medium text-zinc-400">Qtd</p>
							<span>{product.quantity}/un</span>
						</div>

						<div
							className={cn(
								"grid w-full max-w-[150px] transition-all duration-200",
								!sidebar.expanded && "max-w-[270px]"
							)}
						>
							<p className="text-xs font-medium text-zinc-400">Criado em</p>
							<span>{formatDate(product.created_at, "short")}</span>
						</div>

						<div className="flex w-full max-w-[150px] flex-col items-end">
							<p className="whitespace-nowrap text-xs font-medium text-zinc-400">
								Preço de venda
							</p>
							<span>{formatCurrency(product.price)}</span>
						</div>
					</div>
				)
			})}
		</section>
	)
}
