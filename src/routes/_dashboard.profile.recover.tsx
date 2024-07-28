import { createFileRoute } from "@tanstack/react-router"

import { UpdatePasswordForm } from "../modules/profile/components/update-password-form"

export const Route = createFileRoute("/_dashboard/profile/recover")({
	component: RecoverPasswordPage,
})

function RecoverPasswordPage() {
	return <UpdatePasswordForm />
}
