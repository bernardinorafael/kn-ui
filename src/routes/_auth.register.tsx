import { Button } from "@/src/components/ui/button.tsx"
import { RegisterForm } from "@/src/modules/auth/components/register-form.tsx"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/register")({
	component: RegisterPage,
})

function RegisterPage() {
	return (
		<>
			<h1 className="text-4xl font-extrabold tracking-tight">Criar conta</h1>
			<RegisterForm />
			<Button
				asChild
				className="max-w-[620px] p-0 text-zinc-400"
				variant="link"
				size="lg"
			>
				<Link to="/login">Entrar agora</Link>
			</Button>
		</>
	)
}
