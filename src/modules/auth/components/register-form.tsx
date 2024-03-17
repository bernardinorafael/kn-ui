import { useAuth } from '@/src/stores/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { Label } from '@/src/components/ui/label'
import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { errors } from '@/src/modules/auth/constants/errors'
import { RegisterSchema } from '@/src/modules/auth/schemas/register-schema.ts'

const emailAlreadyTaken = errors.emailAlreadyTaken
const documentAlreadyTaken = errors.documentAlreadyTaken

export function RegisterForm() {
	const register = useAuth((store) => store.register)
	const navigate = useNavigate({ from: '/register' })

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
	})

	async function handleRegister(data: z.infer<typeof RegisterSchema>) {
		try {
			await register({
				name: data.name,
				email: data.email,
				password: data.password,
				document: data.document,
			})

			await navigate({ to: '/' })
		} catch (err) {
			if (isAxiosError(err)) {
				const message = err.response?.data.message

				if (message.includes('email is already taken')) {
					toast.error(emailAlreadyTaken.title, {
						description: emailAlreadyTaken.description,
					})
					return
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
		<form className="space-y-4" onSubmit={form.handleSubmit(handleRegister)}>
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
	)
}
