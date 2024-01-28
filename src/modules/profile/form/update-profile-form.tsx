'use client'

import React from 'react'

import { FormError } from '@/src/components/form-error'
import { LoadingButton } from '@/src/components/loading-button'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { mask } from 'remask'
import { toast } from 'sonner'
import { z } from 'zod'

import { InputBox } from '../components/input-box'
import { ProfileBox } from '../components/profile-box'

const user = {
  name: 'rafael',
  surname: 'bernardino',
  email: 'rafael_bernardino@gmail.com',
  phone: '48988566239',
}

const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(3, 'Seu nome precisa ter no mínimo 3 letras.')
    .regex(/^\S+$/, 'Insira apenas seu primeiro nome.')
    .transform((name) => name.trim()),
  surname: z
    .string()
    .min(3, 'Seu sobrenome precisa ter no mínimo 3 letras.')
    .transform((surname) => surname.trim()),
  email: z.string().email('Favor inserir um e-mail válido.'),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, 'Favor inserir um telefone válido.'),
})

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
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast('Seu perfil foi editado com sucesso!')
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
    <ProfileBox title="informações do perfil">
      <form
        id="update-profile"
        className="flex flex-col gap-2 p-4"
        onSubmit={form.handleSubmit(handleEditProfile)}
      >
        <InputBox>
          <label className="text-sm font-medium text-zinc-500">nome</label>

          <div className="flex w-full max-w-[520px] flex-col gap-3 992px:max-w-[380px]">
            <Input {...form.register('name')} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </div>
        </InputBox>

        <InputBox>
          <label className="text-sm font-medium text-zinc-500">sobrenome</label>

          <div className="flex w-full max-w-[520px] flex-col gap-3 992px:max-w-[380px]">
            <Input {...form.register('surname')} />
            {errors.surname && <FormError>{errors.surname.message}</FormError>}
          </div>
        </InputBox>

        <InputBox>
          <label className="text-sm font-medium text-zinc-500">e-mail</label>

          <div className="flex w-full max-w-[520px] flex-col gap-3 992px:max-w-[380px]">
            <Input {...form.register('email')} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>
        </InputBox>

        <InputBox>
          <label className="text-sm font-medium text-zinc-500">telefone</label>

          <div className="flex w-full max-w-[520px] flex-col gap-3 992px:max-w-[380px]">
            <Input {...form.register('phone')} />
            {errors.phone && <FormError>{errors.phone.message}</FormError>}
          </div>
        </InputBox>
      </form>

      <footer className="flex items-start justify-end gap-2 border-t border-zinc-200 p-4">
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
          {form.formState.isSubmitting ? <LoadingButton /> : 'salvar'}
        </Button>
      </footer>
    </ProfileBox>
  )
}
