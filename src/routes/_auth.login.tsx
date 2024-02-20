import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight">entrar</h1>
        <p className="text-zinc-600">insira seu e-mail para entrar com sua conta</p>
      </div>

      <form className="space-y-2">
        <Input autoFocus placeholder="seu-email@email.com" />
        <Input type="password" placeholder="********" />
        <Button className="w-full" size="lg">
          entrar
        </Button>
      </form>

      <Button asChild className="text-zinc-600" variant="link" size="default">
        <Link to="/register">não possui uma conta? cadastre-se</Link>
      </Button>
    </>
  )
}
