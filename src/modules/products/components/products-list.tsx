import type { Product } from "@/src/types/product"
import { formatCurrency } from "@/src/util/format-currency"
import { formatDate } from "@/src/util/format-date"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { CameraSlash } from "@phosphor-icons/react"
import { useSidebar } from "@/src/stores/use-sidebar"
import { cn } from "@/src/util/cn"

type ProductCardProps = {
	products: Product[]
}

export function ProductsList({ products }: ProductCardProps) {
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	return (
		<section className="space-y-4">
			{products.map((p) => {
				return (
					<div
						key={p.public_id}
						className="flex w-full select-none items-center gap-6">
						<Avatar className="h-16 w-16 rounded-lg">
							<AvatarImage src={p.image} />
							<AvatarFallback className="rounded-lg">
								<CameraSlash size={19} />
							</AvatarFallback>
						</Avatar>

						<div className="grid w-full">
							<p className="font-medium text-xs text-zinc-400">Nome</p>
							<span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium uppercase">
								{p.name}
							</span>
						</div>

						<div
							className={cn(
								"grid w-full max-w-[150px] transition-all duration-300",
								!sidebar.expanded && "max-w-[270px]"
							)}>
							<p className="font-medium text-xs text-zinc-400">Qtd</p>
							<span>{p.quantity}/un</span>
						</div>

						<div
							className={cn(
								"grid w-full max-w-[150px] transition-all duration-300",
								!sidebar.expanded && "max-w-[270px]"
							)}>
							<p className="font-medium text-xs text-zinc-400">Criado em</p>
							<span>{formatDate(p.created_at, "short")}</span>
						</div>

						<div className="flex w-full max-w-[150px] flex-col items-end">
							<p className="whitespace-nowrap font-medium text-xs text-zinc-400">
								Preço de venda
							</p>
							<span>{formatCurrency(p.price)}</span>
						</div>
					</div>
				)
			})}
		</section>
	)
}
