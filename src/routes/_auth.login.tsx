import { createFileRoute, Link } from '@tanstack/react-router'

import { Button } from '@/src/components/ui/button.tsx'
import { LoginForm } from '@/src/modules/auth/components/login-form.tsx'

export const Route = createFileRoute('/_auth/login')({
	component: LoginPage,
})

function LoginPage() {
	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-5xl font-extrabold tracking-tight">Entrar</h1>
				<p className="text-zinc-600">Insira seu e-mail para entrar com sua conta</p>
			</div>

			<LoginForm />

			<Button asChild className="text-zinc-600" variant="link" size="default">
				<Link to="/register">Não possui uma conta? cadastre-se</Link>
			</Button>
		</>
	)
}
