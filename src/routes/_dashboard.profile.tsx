import { Breadcrumb } from '@/src/components/breadcrumb.tsx'
import { ProfileModule } from '@/src/modules/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <>
      <Breadcrumb path={['minhas preferências']} />

      <div className="p-4">
        <ProfileModule />
      </div>
    </>
  )
}
