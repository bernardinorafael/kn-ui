import { FormError } from "@/src/components/form-error.tsx"
import { Loading } from "@/src/components/loading.tsx"
import { Button } from "@/src/components/ui/button.tsx"
import { Input } from "@/src/components/ui/input.tsx"
import { Label } from "@/src/components/ui/label.tsx"
import { loginSchema } from "@/src/modules/auth/schemas/login-schema.ts"
import { useAuth } from "@/src/stores/use-auth"
import { sleep } from "@/src/util/sleep"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

export function LoginForm() {
	const login = useAuth((store) => store.login)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	})

	async function handleLogin({ email, password }: z.infer<typeof loginSchema>) {
		await sleep(450)
		await login(email, password)
	}

	const errors = form.formState.errors
	const isSubmitting = form.formState.isSubmitting

	return (
		<form className="w-full space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
			<Label>
				E-mail
				<Input autoFocus {...form.register("email")} />
				{errors.email && <FormError>{errors.email.message}</FormError>}
			</Label>

			<Label>
				Senha
				<Input type="password" {...form.register("password")} />
				{errors.password && <FormError>{errors.password.message}</FormError>}
			</Label>

			<Button className="w-full" size="lg" disabled={isSubmitting}>
				{isSubmitting ? <Loading /> : "Entrar"}
			</Button>
		</form>
	)
}
