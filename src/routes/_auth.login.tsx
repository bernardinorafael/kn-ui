import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div>
      <span>login page</span>
    </div>
  )
}
