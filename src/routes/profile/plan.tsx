import { Breadcrumb } from '@/src/components/breadcrumb'
import { createFileRoute } from '@tanstack/react-router'

function ProfilePlanPage() {
  return (
    <>
      <Breadcrumb path={['meus planos']} />

      <div className="p-4">
        <h1>meus planos</h1>
      </div>
    </>
  )
}

export const Route = createFileRoute('/profile/plan')({
  component: ProfilePlanPage,
})
