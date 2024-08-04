import { Button } from "@/src/components/ui/button.tsx"
import { LoginForm } from "@/src/modules/auth/components/login-form.tsx"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/login")({
	component: LoginPage,
})

function LoginPage() {
	return (
		<>
			<h1 className="text-4xl font-extrabold tracking-tight">Entrar</h1>
			<LoginForm />
			<div className="flex w-full max-w-[620px] items-center justify-between px-6">
				<Button asChild variant="secondary" size="default">
					<Link to="/otp">Entrar com o telefone</Link>
				</Button>
				<Button asChild className="text-zinc-400" variant="link" size="default">
					<Link to="/register">Não possui uma conta? Cadastre-se</Link>
				</Button>
			</div>
		</>
	)
}
