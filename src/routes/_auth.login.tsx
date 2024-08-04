import { Button } from "@/src/components/ui/button.tsx"
import { LoginForm } from "@/src/modules/auth/components/login-form.tsx"
import { DeviceMobile } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/login")({
	component: LoginPage,
})

function LoginPage() {
	return (
		<div className="flex w-full max-w-[620px] flex-col items-center gap-6 px-6">
			<h1 className="text-4xl font-extrabold tracking-tight">Entrar</h1>

			<LoginForm />

			<div className="flex w-full items-center justify-between">
				<Button asChild variant="secondary" size="default">
					<Link to="/otp">
						<DeviceMobile size={22} />
						Entrar com o telefone
					</Link>
				</Button>
				<Button asChild variant="link" size="default">
					<Link to="/register">Não possui uma conta? Cadastre-se</Link>
				</Button>
			</div>
		</div>
	)
}
