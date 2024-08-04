import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { createFileRoute } from "@tanstack/react-router"
import { toast } from "sonner"

import { Box } from "../components/box"
import { Button } from "../components/ui/button"
import { useAuth } from "../stores/use-auth"

export const Route = createFileRoute("/_dashboard/profile/activate")({
	component: ActivateAccountPage,
})

function ActivateAccountPage() {
	const user = useAuth((store) => store.user)

	function handleSendEmailVerification() {
		toast.success("E-mail enviado com sucesso", {
			description: `Enviado para ${user?.email}`,
		})
	}

	return (
		<Card className="max-w-[720px]">
			<CardHeader>
				<CardTitle>Ative sua conta</CardTitle>
				<CardDescription>
					Ativar sua conta desbloqueia todas as funcionalidades do sistema
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<Box>
					<h2 className="font-semibold">Envio por e-mail</h2>
					<p className="text-sm text-zinc-500">
						Enviaremos um link de ativação para o seu e-mail. Clique no link para
						ativar sua conta
					</p>
				</Box>
			</CardContent>
			<CardFooter>
				<Button onClick={handleSendEmailVerification}>
					Enviar link de ativação
				</Button>
			</CardFooter>
		</Card>
	)
}
