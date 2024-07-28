import { createFileRoute } from "@tanstack/react-router"

import { api } from "../lib/axios"
import { UpdateProfileForm } from "../modules/profile/components/update-profile-form"

export const Route = createFileRoute("/_dashboard/profile/edit")({
	component: ChangeProfile,
	loader: async () => {
		const res = await api.get("/users/me")
		return res.data.user
	},
})

function ChangeProfile() {
	const user = Route.useLoaderData()
	return <UpdateProfileForm user={user} />
}
