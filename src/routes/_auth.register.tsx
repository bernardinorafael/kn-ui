import { Button } from "@/src/components/ui/button.tsx"
import { RegisterForm } from "@/src/modules/auth/components/register-form.tsx"
import { CaretLeft } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/register")({
	component: RegisterPage,
})

function RegisterPage() {
	return (
		<div className="flex w-full max-w-[620px] flex-col items-center gap-6 px-6">
			<Button asChild size="default" variant="secondary" className="self-start">
				<Link to="/login">
					<CaretLeft />
					Voltar para o login
				</Link>
			</Button>

			<h1 className="text-4xl font-extrabold tracking-tight">Criar conta</h1>
			<RegisterForm />
		</div>
	)
}
