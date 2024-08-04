import { Button } from "@/src/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/src/components/ui/input-otp"
import { otpCodeSchema } from "@/src/modules/auth/schemas/otp-code-schema"
import { useAuth } from "@/src/stores/use-auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Loading } from "../components/loading"

export const Route = createFileRoute("/_auth/otp/verify")({
	validateSearch: z.object({ phone: z.string() }).parse,
	component: VerifyOtpPage,
})

function VerifyOtpPage() {
	const search = Route.useSearch()
	const loginOtp = useAuth((store) => store.loginOtp)

	const form = useForm<z.infer<typeof otpCodeSchema>>({
		resolver: zodResolver(otpCodeSchema),
		defaultValues: { code: "" },
	})

	async function handleVerifyOtpLogin(data: z.infer<typeof otpCodeSchema>) {
		await loginOtp(search.phone, data.code)
	}

	const code = form.watch("code")

	const iSubmitButtonDisabled = code.length !== 6
	const isSubmitting = form.formState.isSubmitting

	return (
		<>
			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Entrar com o telefone
				</h1>
				<h2 className="text-zinc-500">
					Digite o código enviado para seu telefone para realizar o login
				</h2>
			</div>

			<form
				className="w-full max-w-[620px] space-y-4 px-6"
				onSubmit={form.handleSubmit(handleVerifyOtpLogin)}
			>
				<Controller
					name="code"
					control={form.control}
					render={({ field }) => {
						return (
							<InputOTP maxLength={6} onChange={field.onChange} value={field.value}>
								<InputOTPGroup className="flex w-full items-center justify-between">
									<InputOTPSlot className="aspect-square h-20 w-20" index={0} />
									<InputOTPSlot className="aspect-square h-20 w-20" index={1} />
									<InputOTPSlot className="aspect-square h-20 w-20" index={2} />
									<InputOTPSlot className="aspect-square h-20 w-20" index={3} />
									<InputOTPSlot className="aspect-square h-20 w-20" index={4} />
									<InputOTPSlot className="aspect-square h-20 w-20" index={5} />
								</InputOTPGroup>
							</InputOTP>
						)
					}}
				/>

				<Button
					size="lg"
					type="submit"
					className="w-full"
					disabled={isSubmitting || iSubmitButtonDisabled}
				>
					{isSubmitting ? <Loading /> : "Enviar código"}
				</Button>
			</form>

			<div className="flex w-full max-w-[620px] items-center justify-between px-6">
				<Button variant="secondary" size="default">
					Reenviar código
				</Button>

				<Button asChild className="text-zinc-400" variant="link" size="default">
					<Link to="/otp">Voltar</Link>
				</Button>
			</div>
		</>
	)
}
