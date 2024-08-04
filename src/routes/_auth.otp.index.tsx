import React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretLeft } from "@phosphor-icons/react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { mask, unmask } from "remask"
import { toast } from "sonner"
import type { z } from "zod"

import { FormError } from "../components/form-error"
import { Loading } from "../components/loading"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { api } from "../lib/axios"
import { otpLoginSchema } from "../modules/auth/schemas/otp-login-schema"
import { sleep } from "../util/sleep"

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
			await sleep(450)
			const phone = unmask(data.phone)

			await api.post("/auth/login-otp", { phone })
			await navigate({ to: "/otp/verify", search: { phone } })
		} catch (err) {
			if (isAxiosError(err)) {
				if (err.response?.data.code === 404) {
					toast.error("Usuário não encontrado", {
						description: "Verifique o telefone inserido e tente novamente",
					})
					return
				}
				toast.error("Ocorreu um erro ao tentar efetuar o login", {
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
		<div className="flex w-full max-w-[620px] flex-col items-center gap-6 px-6">
			<Button asChild className="self-start" variant="secondary" size="default">
				<Link to="/login">
					<CaretLeft />
					Voltar
				</Link>
			</Button>

			<h1 className="text-4xl font-extrabold tracking-tight">Entrar</h1>

			<form
				className="w-full space-y-4"
				onSubmit={form.handleSubmit(handleLoginOtp)}
			>
				<Label>
					Telefone
					<Input autoFocus {...form.register("phone")} />
					{errors.phone && <FormError>{errors.phone.message}</FormError>}
				</Label>

				<Button className="w-full" size="lg" disabled={isSubmitting}>
					{isSubmitting ? <Loading /> : "Enviar código"}
				</Button>
			</form>

			<Button asChild variant="link" size="default">
				<Link to="/register">Não possui uma conta? Cadastre-se</Link>
			</Button>
		</div>
	)
}
