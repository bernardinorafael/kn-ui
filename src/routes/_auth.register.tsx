import { createFileRoute, Link } from '@tanstack/react-router'

import { Button } from '@/src/components/ui/button.tsx'
import { RegisterForm } from '@/src/modules/auth/components/register-form.tsx'

export const Route = createFileRoute('/_auth/register')({
	component: RegisterPage,
})

function RegisterPage() {
	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-5xl font-extrabold tracking-tight">Criar conta</h1>
				<p className="text-zinc-600">
					Preencha as informações abaixo para continuar
				</p>
			</div>

			<RegisterForm />

			<div className="space-y-3">
				<div className="flex items-center gap-4">
					<hr className="w-full" />
					<span className="text-sm text-zinc-400">ou</span>
					<hr className="w-full" />
				</div>

				<Button asChild className="w-full gap-2" variant="outline" size="lg">
					<Link to="/login">Entrar agora</Link>
				</Button>
			</div>
		</>
	)
}
