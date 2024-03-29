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

import { useSidebar } from '../stores/use-sidebar'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: ProfilePage,
})

const items = ['Informações pessoais', 'Informações do perfil', 'Atualizar senha']

function ProfilePage() {
  const sidebar = useSidebar((store) => {
    return { expanded: store.expanded }
  })

  return (
    <div
      className={cn('ml-auto w-full max-w-[1192px] space-y-12 self-end p-8', {
        'max-w-[1400px]': !sidebar.expanded,
      })}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
