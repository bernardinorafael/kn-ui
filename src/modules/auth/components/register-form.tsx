import React from "react"

import { FormError } from "@/src/components/form-error.tsx"
import { Loading } from "@/src/components/loading.tsx"
import { Button } from "@/src/components/ui/button.tsx"
import { Input } from "@/src/components/ui/input.tsx"
import { Label } from "@/src/components/ui/label"
import { registerSchema } from "@/src/modules/auth/schemas/register-schema.ts"
import { useAuth } from "@/src/stores/use-auth"
import { sleep } from "@/src/util/sleep"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { mask, unmask } from "remask"
import { z } from "zod"

export function RegisterForm() {
	const register = useAuth((store) => store.register)

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	})

	async function handleRegister(data: z.infer<typeof registerSchema>) {
		await sleep(450)
		await register({
			name: data.name,
			email: data.email,
			phone: unmask(data.phone),
			document: unmask(data.document),
			password: data.password,
		})
		form.reset()
	}

	const phone = form.watch("phone")
	const document = form.watch("document")

	React.useEffect(() => {
		form.setValue("phone", mask(phone, "(99) 9 9999-9999"))
		form.setValue("document", mask(document, "999.999.999-99"))
	}, [form, phone, document])

	const errors = form.formState.errors
	const isSubmitting = form.formState.isSubmitting

	return (
		<form
			className="w-full max-w-[620px] space-y-4 px-6"
			onSubmit={form.handleSubmit(handleRegister)}
		>
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
				CPF
				<Input {...form.register("document")} />
				{errors.document && <FormError>{errors.document.message}</FormError>}
			</Label>

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
