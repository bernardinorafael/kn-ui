import { useAuth } from '@/src/stores/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { sleep } from '@/src/util/sleep.ts'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { Label } from '@/src/components/ui/label'
import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { authErrors } from '@/src/modules/auth/constants/auth-errors.ts'
import { RegisterSchema } from '@/src/modules/auth/schemas/register-schema.ts'

const emailAlreadyTaken = authErrors.emailAlreadyTaken
const documentAlreadyTaken = authErrors.documentAlreadyTaken
const unknownError = authErrors.unknownError

export function RegisterForm() {
	const register = useAuth((store) => store.register)
	const navigate = useNavigate({ from: '/register' })

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
	})

	async function handleRegister(data: z.infer<typeof RegisterSchema>) {
		try {
			/**
			 * INFO: sleep fn is forcing a loading state to improve ui
			 */
			await sleep()

			await register({
				name: data.name,
				email: data.email,
				surname: data.surname,
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
		<form
			className="w-full max-w-[620px] space-y-4 px-6"
			onSubmit={form.handleSubmit(handleRegister)}
		>
			<div className="grid grid-cols-2 gap-4">
				<Label>
					Nome
					<Input autoFocus {...form.register('name')} />
					{errors.name && <FormError>{errors.name.message}</FormError>}
				</Label>

				<Label>
					Sobrenome
					<Input {...form.register('surname')} />
					{errors.surname && <FormError>{errors.surname.message}</FormError>}
				</Label>
			</div>

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
