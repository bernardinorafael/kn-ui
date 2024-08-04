import React from "react"

import { FormError } from "@/src/components/form-error.tsx"
import { Loading } from "@/src/components/loading.tsx"
import { Button } from "@/src/components/ui/button.tsx"
import { Input } from "@/src/components/ui/input.tsx"
import { Label } from "@/src/components/ui/label"
import { api } from "@/src/lib/axios"
import { registerSchema } from "@/src/modules/auth/schemas/register-schema.ts"
import { sleep } from "@/src/util/sleep"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { mask, unmask } from "remask"
import { toast } from "sonner"
import { z } from "zod"

export function RegisterForm() {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	})

	async function handleRegister(data: z.infer<typeof registerSchema>) {
		try {
			/**
			 * sleep fn improves loading ui state
			 */
			await sleep(350)
			await api.post("/auth/register", {
				name: data.name,
				email: data.email,
				phone: unmask(data.phone),
				password: data.password,
			})

			toast.success("Seu cadastro foi efetuado com sucesso", {
				description: "Navegue até o login para entrar",
			})

			form.reset()
		} catch (err) {
			if (isAxiosError(err)) {
				const message = err.response?.data.message
				if (message === "email already taken") {
					toast.error("Já um existe uma conta vinculada neste e-mail")
					return
				}
				if (message === "phone already taken") {
					toast.error("Já um existe uma conta vinculada neste telefone")
					return
				}
				toast.error("Ocorreu um erro ao realizar o cadastro", {
					description: "Por favor, tente novamente mais tarde",
				})
			}
		}
	}

	const phone = form.watch("phone")

	React.useEffect(() => {
		form.setValue("phone", mask(phone, "(99) 9 9999-9999"))
	}, [form, phone])

	const errors = form.formState.errors
	const isSubmitting = form.formState.isSubmitting

	return (
		<form className="w-full space-y-4" onSubmit={form.handleSubmit(handleRegister)}>
			<Label>
				Nome
				<Input autoFocus {...form.register("name")} />
				{errors.name && <FormError>{errors.name.message}</FormError>}
			</Label>

			<div className="grid grid-cols-2 gap-4">
				<Label>
					E-mail
					<Input {...form.register("email")} />
					{errors.email && <FormError>{errors.email.message}</FormError>}
				</Label>
				<Label>
					Telefone
					<Input {...form.register("phone")} />
					{errors.phone && <FormError>{errors.phone.message}</FormError>}
				</Label>
			</div>

			<Label>
				Senha
				<Input type="password" {...form.register("password")} />
				{errors.password && <FormError>{errors.password.message}</FormError>}
			</Label>

			<Button size="lg" className="w-full" disabled={isSubmitting} type="submit">
				{isSubmitting ? <Loading /> : "Cadastrar"}
			</Button>
		</form>
	)
}
