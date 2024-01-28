'use client'

import { FormError } from '@/src/components/form-error'
import { LoadingButton } from '@/src/components/loading-button'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { InputBox } from '../components/input-box'
import { ProfileBox } from '../components/profile-box'
import { UpdatePasswordSchema } from '../schemas/update-password-schema'

type UpdatePasswordInput = z.infer<typeof UpdatePasswordSchema>

const currentPassword = 'abc123'

export function UpdatePasswordForm() {
  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(UpdatePasswordSchema),
  })

  async function handleUpdatePassword(data: UpdatePasswordInput) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (data.password !== currentPassword) {
      toast.error('a senha atual está incorreta!', {
        description: `verifique as informações e tente novamente.`,
      })

      return
    }

    toast.info('enviamos um e-mail de confirmação!', {
      description: `para confirmar a alteração de senha, verifique sua caixa de entrada.`,
    })

    form.reset()
    console.log(data)
  }

  const errors = form.formState.errors

  const isFormDirty = Object.keys(form.formState.dirtyFields).length === 0
  const isCancelButtonDisabled = isFormDirty || form.formState.isSubmitting
  const isSubmitButtonDisabled = form.formState.isSubmitting || isFormDirty

  return (
    <ProfileBox title="alterar senha">
      <form
        id="update-password"
        className="flex flex-col gap-2 p-4"
        onSubmit={form.handleSubmit(handleUpdatePassword)}
      >
        <InputBox>
          <label className="text-sm font-medium text-zinc-500">senha atual</label>

          <div className="flex w-full max-w-[520px] flex-col gap-3 992px:max-w-[380px]">
            <Input
              type="password"
              placeholder="********"
              {...form.register('password')}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </div>
        </InputBox>

        <InputBox>
          <label className="text-sm font-medium text-zinc-500">nova senha</label>

          <div className="flex w-full max-w-[520px] flex-col gap-3 992px:max-w-[380px]">
            <Input
              type="password"
              placeholder="********"
              {...form.register('new_password')}
            />
            {errors.new_password && (
              <FormError>{errors.new_password.message}</FormError>
            )}
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
          form="update-password"
          disabled={isSubmitButtonDisabled}
        >
          {form.formState.isSubmitting ? <LoadingButton /> : 'salvar'}
        </Button>
      </footer>
    </ProfileBox>
  )
}