import { GithubIcon } from '@/src/components/github-icon.tsx'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { CaretLeft } from '@phosphor-icons/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <section className="flex h-full w-full items-center justify-center p-4">
      <Button className="absolute left-7 top-10" size="default" variant="ghost">
        <CaretLeft size={16} weight="bold" />
        voltar
      </Button>

      <div className="flex w-full max-w-[370px] flex-col gap-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight">kn.co</h1>
          <p className="text-zinc-600">
            insira seu e-mail para entrar com sua conta
          </p>
        </div>

        <form className="space-y-2">
          <Input autoFocus placeholder="seu-email@email.com" />
          <Input type="password" placeholder="********" />
          <Button className="w-full" size="lg">
            entrar
          </Button>
        </form>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <hr className="w-full" />
            <span className="text-sm text-zinc-400">ou</span>
            <hr className="w-full" />
          </div>

          <Button className="w-full gap-2" variant="outline" size="lg">
            <GithubIcon className="fill-black dark:fill-white" />
            GitHub
          </Button>
        </div>

        <Button asChild className="text-zinc-600" variant="link" size="default">
          <Link to="/register">não possui uma conta? cadastre-se</Link>
        </Button>
      </div>
    </section>
  )
}
