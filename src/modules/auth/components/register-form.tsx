import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { setCookie } from 'nookies'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/src/lib/axios'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { Label } from '@/src/components/ui/label'
import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { errors } from '@/src/modules/auth/constants/errors'
import { RegisterSchema } from '@/src/modules/auth/schemas/register-schema.ts'

const emailAlreadyTaken = errors.emailAlreadyTaken
const documentAlreadyTaken = errors.documentAlreadyTaken

type RegisterUserInput = z.infer<typeof RegisterSchema>

export function RegisterForm() {
	const navigate = useNavigate({ from: '/register' })

	const form = useForm<RegisterUserInput>({
		resolver: zodResolver(RegisterSchema),
	})

	async function handleRegisterUser(data: RegisterUserInput) {
		try {
			const res = await api.post('/auth/register', {
				name: data.name,
				email: data.email,
				document: data.document,
				password: data.password,
			})

			const { access_token } = res.data

			setCookie(null, 'kn-token', access_token, {
				maxAge: 60 * 60 * 24, // 7 days
				path: '/',
			})

			api.defaults.headers.Authorization = access_token

			await navigate({ to: '/' })
		} catch (err) {
			if (isAxiosError(err)) {
				const message = err.response?.data.message

				if (message.includes('email is already taken')) {
					toast.error(emailAlreadyTaken.title, {
						description: emailAlreadyTaken.description,
					})
				}

				if (message.includes('document is already taken')) {
					toast.error(documentAlreadyTaken.title, {
						description: documentAlreadyTaken.description,
					})
				}
			}
		}
	}

	const errors = form.formState.errors
	const isSubmitting = form.formState.isSubmitting

	return (
		<>
			<form className="space-y-4" onSubmit={form.handleSubmit(handleRegisterUser)}>
				<Label>
					Nome
					<Input autoFocus {...form.register('name')} />
					{errors.name && <FormError>{errors.name.message}</FormError>}
				</Label>

				<Label>
					E-mail
					<Input {...form.register('email')} />
					{errors.email && <FormError>{errors.email.message}</FormError>}
				</Label>

				<Label>
					CPF
					<Input {...form.register('document')} />
					{errors.document && <FormError>{errors.document.message}</FormError>}
				</Label>

				<Label>
					Senha
					<Input type="password" {...form.register('password')} />
					{errors.password && <FormError>{errors.password.message}</FormError>}
				</Label>

				<Button className="w-full" size="lg" disabled={isSubmitting} type="submit">
					{isSubmitting ? <Loading /> : 'Cadastrar e entrar'}
				</Button>
			</form>
		</>
	)
}
