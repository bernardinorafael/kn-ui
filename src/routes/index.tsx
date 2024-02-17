import { Breadcrumb } from '@/src/components/breadcrumb'
import { createFileRoute } from '@tanstack/react-router'

function HomePage() {
  return (
    <>
      <Breadcrumb path={['início']} />
    </>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
