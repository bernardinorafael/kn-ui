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
				variant="link"
				size="default"
				className="max-w-[620px] text-zinc-400"
			>
				<Link to="/login">Ir para o login</Link>
			</Button>
		</>
	)
}
