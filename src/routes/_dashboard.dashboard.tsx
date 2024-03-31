import { House } from '@phosphor-icons/react'
import { createFileRoute } from '@tanstack/react-router'

import { cn } from '@/src/util/cn'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/components/ui/breadcrumb'

import { useSidebar } from '../stores/use-sidebar'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: ProfilePage,
})

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
            <House size={16} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full w-full items-center justify-center">
        <p className="text-3xl font-bold">under construction</p>
      </div>
    </div>
  )
}
