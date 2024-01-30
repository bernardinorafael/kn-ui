import { Breadcrumb } from '@/src/components/breadcrumb'
import { ProfileModule } from '@/src/modules/profile'

export default function ProfilePage() {
  return (
    <>
      <Breadcrumb path={['minhas preferências']} />

      <div className="p-4">
        <ProfileModule />
      </div>
    </>
  )
}
