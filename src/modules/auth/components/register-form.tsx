import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { RegisterSchema } from '@/src/modules/auth/schemas/register-schema.ts'

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  })

  async function handleRegisterUser(data: z.infer<typeof RegisterSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(data)
    } catch (err) {
      // TODO: lidar com exceções após conexão com a API;
      console.log(err)
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
            placeholder="seu-email@email.com"
            {...form.register('email')}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </div>

        <div className="grid gap-3">
          <Input
            type="password"
            placeholder="************"
            {...form.register('password')}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>

        <div className="grid gap-3">
          <Input
            type="password"
            placeholder="************"
            {...form.register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}
        </div>

        <Button className="w-full" size="lg" disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loading /> : 'cadastrar e entrar'}
        </Button>
      </form>
    </>
  )
}
