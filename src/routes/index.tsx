import { Breadcrumb } from '@/src/components/breadcrumb'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Breadcrumb path={['início']} />
    </>
  )
}
