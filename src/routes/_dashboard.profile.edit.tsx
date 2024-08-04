import React from "react"

import { Box } from "@/src/components/box"
import { FormError } from "@/src/components/form-error"
import { Button } from "@/src/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { api } from "@/src/lib/axios"
import { updateProfileSchema } from "@/src/modules/profile/schemas/update-profile-schema.ts"
import { useAuth } from "@/src/stores/use-auth"
import { sleep } from "@/src/util/sleep"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute } from "@tanstack/react-router"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { mask, unmask } from "remask"
import { toast } from "sonner"
import type { z } from "zod"

export const Route = createFileRoute("/_dashboard/profile/edit")({
	component: ChangeProfile,
	loader: async () => {
		const res = await api.get("/users/me")
		return res.data.user
	},
})

function ChangeProfile() {
	const user = Route.useLoaderData()
	const { getSigned } = useAuth((store) => ({ getSigned: store.getSigned }))

	const form = useForm<z.infer<typeof updateProfileSchema>>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
			phone: user.phone,
		},
	})

	async function handleEditProfile(data: z.infer<typeof updateProfileSchema>) {
		try {
			/**
			 * sleep fn improves loading ui state
			 */
			await sleep(350)
			await api.put(`/users/${user.public_id}`, {
				name: data.name,
				email: data.email,
				phone: unmask(data.phone),
			})

			await getSigned()
			toast.success("Suas informações foram atualizadas")
		} catch (err) {
			if (isAxiosError(err)) {
				toast.error("Não foi possível atualizar suas informações")
			}
		}
	}

	const phone = form.watch("phone")

	React.useEffect(() => {
		form.setValue("phone", mask(phone, "(99) 9 9999-9999"))
	}, [form, phone])

	const isSubmitButtonDisabled = form.formState.isSubmitting
	const errors = form.formState.errors

	return (
		<Card className="max-w-[720px]">
			<CardHeader>
				<CardTitle>Informações do perfil</CardTitle>
				<CardDescription>Altere aqui as informações do seu perfil</CardDescription>
			</CardHeader>
			<CardContent>
				<Box>
					<form
						id="update-profile"
						className="space-y-4"
						onSubmit={form.handleSubmit(handleEditProfile)}
					>
						<Label className="w-full transition-all duration-300">
							Nome
							<Input {...form.register("name")} />
							{errors.name && <FormError>{errors.name.message}</FormError>}
						</Label>

						<Label className="w-full transition-all duration-300">
							E-mail
							<Input {...form.register("email")} />
							{errors.email && <FormError>{errors.email.message}</FormError>}
						</Label>

						<Label className="w-full transition-all duration-300">
							Telefone
							<Input {...form.register("phone")} />
							{errors.phone && <FormError>{errors.phone.message}</FormError>}
						</Label>
					</form>
				</Box>
			</CardContent>
			<CardFooter>
				<Button
					size="sm"
					type="submit"
					form="update-profile"
					disabled={isSubmitButtonDisabled}
				>
					Salvar alterações
				</Button>
			</CardFooter>
		</Card>
	)
}
