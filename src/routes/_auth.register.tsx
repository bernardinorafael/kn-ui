import { TermsOfServices } from '@/src/components/tos.tsx'
import { Button } from '@/src/components/ui/button.tsx'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from '@/src/components/ui/drawer'
import { Input } from '@/src/components/ui/input.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

// TODO: Precisa melhorar o componente Terms of Services.
function RegisterPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight">criar conta</h1>
        <p className="text-zinc-600">
          preencha as informações abaixo para continuar
        </p>
      </div>

      <form className="space-y-2">
        <Input autoFocus placeholder="seu-email@email.com" />
        <Input placeholder="************" />
        <Input placeholder="************" />

        <Button className="w-full" size="lg">
          cadastrar e entrar
        </Button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <hr className="w-full" />
          <span className="text-sm text-zinc-400">ou</span>
          <hr className="w-full" />
        </div>

        <Button asChild className="w-full gap-2" variant="outline" size="lg">
          <Link to="/login">entrar agora</Link>
        </Button>
      </div>

      <Drawer>
        <DrawerContent className="h-[55vh]">
          <div className="mt-4 flex h-full flex-col items-center overflow-y-auto">
            <TermsOfServices />
            <DrawerFooter className="flex w-full max-w-[720px]">
              <Button>aceitar</Button>
              <DrawerClose asChild>
                <Button variant="outline">cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
