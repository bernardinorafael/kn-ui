import React from 'react'

import { useSidebar } from '@/src/stores/use-sidebar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { mask } from 'remask'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@/src/util/cn'
import { sleep } from '@/src/util/sleep'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { FormError } from '@/src/components/form-error'
import { UpdateProfileSchema } from '@/src/modules/profile/schemas/update-profile-schema.ts'

const user = {
  name: 'rafael',
  surname: 'bernardino',
  email: 'rafaelferreirab2@gmail.com',
  phone: '48988566239',
}

export function UpdateProfileForm() {
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
    },
  })

  const errors = form.formState.errors

  async function handleEditProfile(data: z.infer<typeof UpdateProfileSchema>) {
    await sleep(1000)
    toast.success('Suas informações foram atualizadas!')
    console.log(data)
  }

  const phone = form.watch('phone')

  React.useEffect(() => {
    form.setValue('phone', mask(phone, '(99) 9 9999-9999'))
  }, [form, phone])

  return (
    <form
      className="flex flex-col gap-2 p-4"
      onSubmit={form.handleSubmit(handleEditProfile)}
    >
      <Label className="flex items-center justify-between">
        Nome
        <div
          className={cn(
            'transition-width grid w-full max-w-[520px] gap-2 duration-300',
            { 'max-w-[680px]': !sidebar.expanded },
          )}
        >
          <Input {...form.register('name')} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </div>
      </Label>

      <Label className="flex items-center justify-between">
        Sobrenome
        <div
          className={cn(
            'transition-width grid w-full max-w-[520px] gap-2 duration-300',
            { 'max-w-[680px]': !sidebar.expanded },
          )}
        >
          <Input {...form.register('surname')} />
          {errors.surname && <FormError>{errors.surname.message}</FormError>}
        </div>
      </Label>

      <Label className="flex items-center justify-between">
        E-mail
        <div
          className={cn(
            'transition-width grid w-full max-w-[520px] gap-2 duration-300',
            { 'max-w-[680px]': !sidebar.expanded },
          )}
        >
          <Input {...form.register('email')} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </div>
      </Label>

      <Label className="flex items-center justify-between">
        Telefone
        <div
          className={cn(
            'transition-width grid w-full max-w-[520px] gap-2 duration-300',
            { 'max-w-[680px]': !sidebar.expanded },
          )}
        >
          <Input {...form.register('phone')} />
          {errors.phone && <FormError>{errors.phone.message}</FormError>}
        </div>
      </Label>
    </form>
  )
}
