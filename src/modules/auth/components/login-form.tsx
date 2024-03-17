import { useAuth } from '@/src/stores/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { Label } from '@/src/components/ui/label.tsx'
import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { errors } from '@/src/modules/auth/constants/errors.ts'
import { LoginSchema } from '@/src/modules/auth/schemas/login-schema.ts'

const unauthorizedError = errors.unauthorized
const unknownError = errors.unknownError

export function LoginForm() {
	const login = useAuth((store) => store.login)
	const navigate = useNavigate({ from: '/login' })

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
	})
	const errors = form.formState.errors
	const isSubmitting = form.formState.isSubmitting

	async function handleLogin({ email, password }: z.infer<typeof LoginSchema>) {
		try {
			await login(email, password)
			await navigate({ to: '/' })
		} catch (err) {
			if (isAxiosError(err)) {
				const code = err.response?.data.code
				if (code === 401) {
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
		<form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
			<Label>
				E-mail
				<Input autoFocus {...form.register('email')} />
				{errors.email && <FormError>{errors.email.message}</FormError>}
			</Label>

			<Label>
				Senha
				<Input type="password" {...form.register('password')} />
				{errors.password && <FormError>{errors.password.message}</FormError>}
			</Label>

			<Button className="w-full" size="lg" disabled={isSubmitting}>
				{isSubmitting ? <Loading /> : 'Entrar'}
			</Button>
		</form>
	)
}
