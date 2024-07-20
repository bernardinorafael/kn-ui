import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/src/components/ui/button"

import notFoundIllustration from "../../../../public/searching.png"

export function EmptyProductsList() {
	const navigate = useNavigate({ from: "/products" })

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<img width={280} src={notFoundIllustration} alt="" />

			<div className="flex flex-col items-center">
				<h2 className="font-medium text-2xl">Nenhum produto encontrado</h2>
				<p className="font-medium text-zinc-400">Crie um novo produto abaixo</p>
				<Button
					onClick={() => navigate({ to: "/products/new" })}
					size="sm"
					className="mt-2">
					Criar produto
				</Button>
			</div>
		</div>
	)
}
