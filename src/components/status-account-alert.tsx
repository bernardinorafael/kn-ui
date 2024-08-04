import { Link } from "@tanstack/react-router"

import { StatusUser } from "../enum/user-status"
import { cn } from "../util/cn"
import { Button } from "./ui/button"

type StatusAccountProps = {
	status: string
}

export function StatusAccountAlert({ status }: StatusAccountProps) {
	const isActivationSent = status === StatusUser.ActivationSent
	const isPending = status === StatusUser.Pending

	return (
		<div
			className={cn(
				"flex h-[42px] w-full items-center justify-center gap-2 text-sm font-semibold text-white",
				isActivationSent ? "bg-green-500" : "bg-yellow-600"
			)}
		>
			<p>
				{isActivationSent
					? "Enviamos um link de ativação para seu e-mail. Verifique sua caixa de entrada"
					: "Você precisa ativar sua conta para ter acesso a todas as funcionalidades."}
			</p>
			{isPending && (
				<Button
					asChild
					variant="link"
					className="p-0 text-sm font-semibold text-white"
				>
					<Link to="/profile/activate">Ativar agora</Link>
				</Button>
			)}
		</div>
	)
}
