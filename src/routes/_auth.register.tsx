import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div>
      <span>register page</span>
    </div>
  )
}
