import { Link } from "@tanstack/react-router"

import { Button } from "./ui/button"

export function StatusAccountAlert() {
	return (
		<div className="flex h-[32px] w-full items-center justify-center gap-2 bg-yellow-600 text-sm text-white">
			<p>
				Você precisa ativar sua conta para ter acesso a todas as funcionalidades.
			</p>
			<Button
				asChild
				variant="link"
				className="p-0 text-sm font-semibold text-white"
			>
				<Link to="/profile/activate">Ativar agora</Link>
			</Button>
		</div>
	)
}
