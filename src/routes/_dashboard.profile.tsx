import { createFileRoute } from '@tanstack/react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/components/ui/breadcrumb.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { Box } from '@/src/modules/auth/components/box.tsx'
import { ToggleThemeSelect } from '@/src/modules/profile/components/toggle-theme-select.tsx'
import { UpdatePasswordForm } from '@/src/modules/profile/form/update-password-form.tsx'
import { UpdateProfileForm } from '@/src/modules/profile/form/update-profile-form.tsx'

export const Route = createFileRoute('/_dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Meu perfil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="p-6">
        <section className="flex flex-col items-center gap-6">
          <Box title="Informações pessoais">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500">Usuário</span>
                <Input
                  disabled
                  className="max-w-[520px] 992px:max-w-[380px]"
                  value="bernardinorafael"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500">CPF</span>
                <Input
                  disabled
                  className="max-w-[520px] 992px:max-w-[380px]"
                  value="***.845.109-**"
                />
              </div>
            </div>
          </Box>

          <Box title="Informações do perfil">
            <UpdateProfileForm />
          </Box>

          <Box title="Alterar senha">
            <UpdatePasswordForm />
          </Box>

          <Box title="Tema da interface">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500">Tema</span>

                <div className="w-full max-w-[520px] 992px:max-w-[380px]">
                  <ToggleThemeSelect />
                </div>
              </div>
            </div>
          </Box>
        </section>
      </div>
    </>
  )
}
