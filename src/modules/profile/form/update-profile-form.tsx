import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { mask } from 'remask'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@/src/util/cn.ts'
import { sleep } from '@/src/util/sleep'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { FormError } from '@/src/components/form-error'
import { InputBox } from '@/src/components/input-box'
import { Loading } from '@/src/components/loading'
import { UpdateProfileSchema } from '@/src/modules/profile/schemas/update-profile-schema.ts'

const user = {
	name: 'rafael',
	surname: 'bernardino',
	email: 'rafaelferreirab2@gmail.com',
	phone: '48988566239',
}

type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>

export function UpdateProfileForm() {
	const form = useForm<UpdateProfileInput>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			name: user.name,
			surname: user.surname,
			email: user.email,
			phone: user.phone,
		},
	})

	async function handleEditProfile(data: UpdateProfileInput) {
		await sleep(1000)
		toast.success('Suas informações foram atualizadas!')
		console.log(data)
	}

	const phone = form.watch('phone')
	React.useEffect(() => {
		form.setValue('phone', mask(phone, '(99) 9 9999-9999'))
	}, [form, phone])

	const errors = form.formState.errors

	const isFormDirty = Object.keys(form.formState.dirtyFields).length === 0
	const isCancelButtonDisabled = isFormDirty || form.formState.isSubmitting
	const isSubmitButtonDisabled = form.formState.isSubmitting || isFormDirty

	return (
		<>
			<form
				id="update-profile"
				className="flex flex-col gap-2 p-4"
				onSubmit={form.handleSubmit(handleEditProfile)}
			>
				<InputBox>
					<label className="text-sm font-medium text-zinc-500">Nome</label>
					<div className="grid w-full max-w-[520px] gap-2 992px:max-w-[380px]">
						<Input {...form.register('name')} />
						{errors.name && <FormError>{errors.name.message}</FormError>}
					</div>
				</InputBox>

				<InputBox>
					<label className="text-sm font-medium text-zinc-500">Sobrenome</label>
					<div className="grid w-full max-w-[520px] gap-2 992px:max-w-[380px]">
						<Input {...form.register('surname')} />
						{errors.surname && <FormError>{errors.surname.message}</FormError>}
					</div>
				</InputBox>

				<InputBox>
					<label className="text-sm font-medium text-zinc-500">E-mail</label>
					<div className="grid w-full max-w-[520px] gap-2 992px:max-w-[380px]">
						<Input {...form.register('email')} />
						{errors.email && <FormError>{errors.email.message}</FormError>}
					</div>
				</InputBox>

				<InputBox>
					<label className="text-sm font-medium text-zinc-500">Telefone</label>
					<div className="grid w-full max-w-[520px] gap-2 992px:max-w-[380px]">
						<Input {...form.register('phone')} />
						{errors.phone && <FormError>{errors.phone.message}</FormError>}
					</div>
				</InputBox>
			</form>

			<footer
				className={cn(
					'flex items-start justify-end gap-2 border-t',
					'border-zinc-200 p-4 dark:border-zinc-800',
				)}
			>
				<Button
					size="sm"
					variant="outline"
					disabled={isCancelButtonDisabled}
					onClick={() => form.reset()}
				>
					cancelar
				</Button>
				<Button
					size="sm"
					type="submit"
					form="update-profile"
					disabled={isSubmitButtonDisabled}
				>
					{form.formState.isSubmitting ? <Loading /> : 'salvar'}
				</Button>
			</footer>
		</>
	)
}
