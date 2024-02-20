import { FormError } from '@/src/components/form-error.tsx'
import { Loading } from '@/src/components/loading.tsx'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { LoginSchema } from '@/src/modules/auth/schemas/login-schema.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// TODO: Implementar lógica para abrir os Termos de Serviço.
export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })

  async function handleLogin(data: z.infer<typeof LoginSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    form.reset()
    console.log(data)
  }

  const errors = form.formState.errors
  const isSubmitting = form.formState.isSubmitting

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
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
          placeholder="********"
          {...form.register('password')}
        />
        {errors.password && <FormError>{errors.password.message}</FormError>}
      </div>

      <Button className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? <Loading /> : 'entrar'}
      </Button>
    </form>
  )
}
