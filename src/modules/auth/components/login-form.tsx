import { useAuth } from "@/src/stores/use-auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { sleep } from "@/src/util/sleep"
import { Button } from "@/src/components/ui/button.tsx"
import { Input } from "@/src/components/ui/input.tsx"
import { Label } from "@/src/components/ui/label.tsx"
import { FormError } from "@/src/components/form-error.tsx"
import { Loading } from "@/src/components/loading.tsx"
import { authErrors } from "@/src/modules/auth/constants/auth-errors.ts"
import { LoginSchema } from "@/src/modules/auth/schemas/login-schema.ts"

const unauthorizedError = authErrors.unauthorized
const unknownError = authErrors.unknownError

export function LoginForm() {
	const login = useAuth((store) => store.login)
	const navigate = useNavigate({ from: "/login" })

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
	})
	const errors = form.formState.errors
	const isSubmitting = form.formState.isSubmitting

	async function handleLogin({ email, password }: z.infer<typeof LoginSchema>) {
		try {
			/**
			 * sleep fn is forcing a loading state to improve ui
			 */
			await sleep()

			await login(email, password)
			await navigate({ to: "/" })
		} catch (err) {
			form.setFocus("email")
			if (isAxiosError(err)) {
				if (err.response?.data.code === 401) {
					toast.error(unauthorizedError.title, {
						description: unauthorizedError.description,
					})
					return
				}
				toast.error(unknownError.title, {
					description: unknownError.description,
				})
			}
		}
	}

	return (
		<form
			className="w-full max-w-[620px] space-y-4 px-6"
			onSubmit={form.handleSubmit(handleLogin)}
		>
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
