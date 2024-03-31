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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

import { Box } from '../modules/auth/components/box'
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
        'transition-width ml-auto w-full max-w-[1192px] space-y-12 self-end p-8 duration-300',
        { 'max-w-[1400px]': !sidebar.expanded },
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

      <div className="flex items-start justify-between gap-12">
        <aside className="flex w-full max-w-[320px] flex-col items-start">
          {items.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="w-full justify-start text-base font-normal text-zinc-300"
            >
              {item}
            </Button>
          ))}
        </aside>

        <Card>
          <CardHeader>
            <CardTitle>Informações do perfil</CardTitle>
            <CardDescription>
              Altere aqui as informações do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Box>
              <UpdateProfileForm />
            </Box>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="secondary">
              Resetar
            </Button>
            <Button size="sm" type="submit" form="update-profile">
              Salvar alterações
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
