import { createFileRoute } from '@tanstack/react-router'

import { cn } from '@/src/util/cn'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/components/ui/breadcrumb'
import { Button } from '@/src/components/ui/button'
import { Box } from '@/src/modules/auth/components/box'

import { UpdateProfileForm } from '../modules/profile/form/update-profile-form'
import { useSidebar } from '../stores/use-sidebar'

export const Route = createFileRoute('/_dashboard/profile')({
  component: ProfilePage,
})

const items = ['Informações pessoais', 'Informações do perfil', 'Atualizar senha']

function ProfilePage() {
  const sidebar = useSidebar((store) => {
    return { expanded: store.expanded }
  })

  return (
    <div
      className={cn(
        'transition-width ml-auto w-full max-w-[1192px] space-y-12 self-end p-8 duration-500',
        {
          'max-w-[1400px]': !sidebar.expanded,
        },
      )}
    >
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

      <div className="flex items-start justify-between gap-4">
        <aside className="flex w-full max-w-[320px] flex-col items-start">
          {items.map((item) => (
            <Button
              key={item}
              variant="link"
              className="px-0 text-base text-zinc-300"
            >
              {item}
            </Button>
          ))}
        </aside>

        <Box
          title="Informações do perfil"
          className={cn('max-w-[720px] duration-500', {
            'max-w-[920px]': !sidebar.expanded,
          })}
        >
          <UpdateProfileForm />
        </Box>
      </div>

      {/* <section className="flex flex-col items-center gap-6">
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
				</section> */}
    </div>
  )
}
