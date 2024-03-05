import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { setCookie } from 'nookies'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/src/lib/axios.ts'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { Label } from '@/src/components/ui/label.tsx'
import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { errors } from '@/src/modules/auth/constants/errors.ts'
import { LoginSchema } from '@/src/modules/auth/schemas/login-schema.ts'

const unauthorized = errors.unauthorized
const unknownError = errors.unknownError

export function LoginForm() {
	const navigate = useNavigate({ from: '/login' })

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
	})

	async function handleLogin(data: z.infer<typeof LoginSchema>) {
		try {
			const response = await api.post('/auth/login', {
				email: data.email,
				password: data.password,
			})
			const token = response.data.access_token

			setCookie(null, 'kn-token', token, {
				maxAge: 60 * 60 * 24, // 1 day
				path: '/',
			})

			api.defaults.headers.token = token

			navigate({ to: '/' })
		} catch (err) {
			if (isAxiosError(err)) {
				const code = err.response?.data.code
				if (code === 401) {
					toast.error(unauthorized.title, {
						description: unauthorized.description,
					})
					return
				}
				toast.error(unknownError.title, {
					description: unknownError.description,
				})
			}
		}
	}

	const errors = form.formState.errors
	const isSubmitting = form.formState.isSubmitting

	return (
		<form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
			<Label>
				E-mail
				<Input
					autoFocus
					placeholder="seu-email@exemplo.com"
					{...form.register('email')}
				/>
				{errors.email && <FormError>{errors.email.message}</FormError>}
			</Label>

			<Label>
				Senha
				<Input
					type="password"
					placeholder="************"
					{...form.register('password')}
				/>
				{errors.password && <FormError>{errors.password.message}</FormError>}
			</Label>

			<Button className="w-full" size="lg" disabled={isSubmitting}>
				{isSubmitting ? <Loading /> : 'Entrar'}
			</Button>
		</form>
	)
}
