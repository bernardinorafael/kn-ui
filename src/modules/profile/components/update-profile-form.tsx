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
import type { User } from "@/src/types/user"
import { sleep } from "@/src/util/sleep"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { mask, unmask } from "remask"
import { toast } from "sonner"
import type { z } from "zod"

type UpdateProfileProps = {
	user: User
}

export function UpdateProfileForm({ user }: UpdateProfileProps) {
	const { getSigned } = useAuth((store) => ({ getSigned: store.getSigned }))

	const form = useForm<z.infer<typeof updateProfileSchema>>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
			phone: user.phone,
			document: user.document,
		},
	})

	async function handleEditProfile(data: z.infer<typeof updateProfileSchema>) {
		try {
			/**
			 * sleep fn to improve loading state
			 */
			await sleep(350)
			await api.put(`/users/${user.public_id}`, {
				name: data.name,
				email: data.email,
				document: unmask(data.document),
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
	const document = form.watch("document")

	React.useEffect(() => {
		form.setValue("phone", mask(phone, "(99) 9 9999-9999"))
		form.setValue("document", mask(document, "999.999.999-99"))
	}, [form, phone, document])

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

						<Label className="w-full transition-all duration-300">
							CPF
							<Input {...form.register("document")} />
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
