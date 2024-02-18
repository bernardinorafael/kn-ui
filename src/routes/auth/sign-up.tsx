import { SignUp } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

function SignInPage() {
  return <SignUp />
}

export const Route = createFileRoute('/auth/sign-up')({
  component: SignInPage,
})
