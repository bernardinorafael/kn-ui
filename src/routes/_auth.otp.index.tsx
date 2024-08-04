import React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { mask, unmask } from "remask"
import type { z } from "zod"

import { FormError } from "../components/form-error"
import { Loading } from "../components/loading"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { api } from "../lib/axios"
import { otpLoginSchema } from "../modules/auth/schemas/otp-login-schema"

export const Route = createFileRoute("/_auth/otp/")({
	component: OtpPage,
})

function OtpPage() {
	const navigate = useNavigate({ from: "/otp" })

	const form = useForm<z.infer<typeof otpLoginSchema>>({
		resolver: zodResolver(otpLoginSchema),
	})

	async function handleLoginOtp(data: z.infer<typeof otpLoginSchema>) {
		try {
			const phone = unmask(data.phone)

			await api.post("/auth/login-otp", { phone })
			await navigate({ to: "/otp/verify", search: { phone } })
		} catch (err) {
			if (isAxiosError(err)) {
				console.error(err)
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
		<>
			<h1 className="text-4xl font-extrabold tracking-tight">Entrar</h1>

			<form
				className="w-full max-w-[620px] space-y-4 px-6"
				onSubmit={form.handleSubmit(handleLoginOtp)}
			>
				<Label>
					Telefone
					<Input autoFocus {...form.register("phone")} />
					{errors.phone && <FormError>{errors.phone.message}</FormError>}
				</Label>

				<Button className="w-full" size="lg">
					{isSubmitting ? <Loading /> : "Enviar código"}
				</Button>
			</form>

			<div className="flex w-full max-w-[620px] items-center justify-between px-6">
				<Button asChild variant="secondary" size="default">
					<Link to="/login">Entrar com e-mail e senha</Link>
				</Button>
				<Button asChild className="text-zinc-400" variant="link" size="default">
					<Link to="/register">Não possui uma conta? Cadastre-se</Link>
				</Button>
			</div>
		</>
	)
}
