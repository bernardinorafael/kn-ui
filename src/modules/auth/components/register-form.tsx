import { useAuthentication } from '@/src/stores/use-authentication'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { errors } from '@/src/modules/auth/constants/errors'
import { RegisterSchema } from '@/src/modules/auth/schemas/register-schema.ts'

const emailAlreadyTaken = errors.emailAlreadyTaken
const documentAlreadyTaken = errors.documentAlreadyTaken

export function RegisterForm() {
	const navigate = useNavigate({ from: '/register' })

	const register = useAuthentication((store) => store.register)

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
	})

	async function handleRegisterUser(data: z.infer<typeof RegisterSchema>) {
		try {
			await register({
				name: data.name,
				email: data.email,
				document: data.document,
				password: data.password,
			})

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
				<div className="grid gap-3">
					<Input
						autoFocus
						placeholder="Digite seu nome"
						{...form.register('name')}
					/>
					{errors.name && <FormError>{errors.name.message}</FormError>}
				</div>

				<div className="grid gap-3">
					<Input placeholder="Seu e-mail" {...form.register('email')} />
					{errors.email && <FormError>{errors.email.message}</FormError>}
				</div>

				<div className="grid gap-3">
					<Input placeholder="Digite seu CPF" {...form.register('document')} />
					{errors.document && <FormError>{errors.document.message}</FormError>}
				</div>

				<div className="grid gap-3">
					<Input
						type="password"
						placeholder="************"
						{...form.register('password')}
					/>
					{errors.password && <FormError>{errors.password.message}</FormError>}
				</div>

				<Button className="w-full" size="lg" disabled={isSubmitting} type="submit">
					{isSubmitting ? <Loading /> : 'cadastrar e entrar'}
				</Button>
			</form>
		</>
	)
}
