import { Breadcrumb } from '@/src/components/breadcrumb'
import { ProfileModule } from '@/src/modules/profile'
import { createFileRoute } from '@tanstack/react-router'

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

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
})
