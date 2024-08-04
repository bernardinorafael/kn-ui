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
import { useAuth } from "@/src/stores/use-auth"
import { sleep } from "@/src/util/sleep"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute } from "@tanstack/react-router"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp"
import { updatePasswordSchema } from "../modules/profile/schemas/update-password-schema"

export const Route = createFileRoute("/_dashboard/profile/password")({
	component: RecoverPasswordPage,
})

function RecoverPasswordPage() {
	const user = useAuth((store) => store.user)

	const form = useForm<z.infer<typeof updatePasswordSchema>>({
		resolver: zodResolver(updatePasswordSchema),
	})

	async function handleUpdatePassword(data: z.infer<typeof updatePasswordSchema>) {
		try {
			/**
			 * sleep fn to improve loading state
			 */
			await sleep(350)
			await api.patch(`/users/${user?.public_id}/password`, {
				old_password: data.old,
				new_password: data.new,
			})

			toast.success("Suas informações foram atualizadas")
		} catch (err) {
			if (isAxiosError(err)) {
				toast.error("Não foi possível atualizar suas informações")
			}
		}
	}

	const isSubmitButtonDisabled = form.formState.isSubmitting
	const errors = form.formState.errors

	return (
		<Card className="max-w-[720px]">
			<CardHeader>
				<CardTitle>Altere sua senha</CardTitle>
				<CardDescription>Altere aqui a sua senha de acesso</CardDescription>
			</CardHeader>
			<CardContent>
				<Box>
					<form
						id="update-password"
						className="space-y-4"
						onSubmit={form.handleSubmit(handleUpdatePassword)}
					>
						<Label className="w-full transition-all duration-300">
							Senha atual
							<Input
								type="password"
								placeholder="********"
								{...form.register("old")}
							/>
							{errors.old && <FormError>{errors.old.message}</FormError>}
						</Label>

						<Label className="w-full transition-all duration-300">
							Nova senha
							<Input
								type="password"
								placeholder="********"
								{...form.register("new")}
							/>
							{errors.new && <FormError>{errors.new.message}</FormError>}
						</Label>
					</form>
				</Box>
			</CardContent>
			<CardFooter>
				<Dialog>
					<DialogTrigger asChild>
						<Button size="sm" type="button">
							Salvar alterações
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>SMS Enviado para o Número de Cadastro</DialogTitle>
							<DialogDescription>
								Para confirmar a alteração da senha, por favor insira o código
								enviado para o seu celular
							</DialogDescription>
						</DialogHeader>
						<div className="mt-4 flex flex-col gap-1">
							<InputOTP maxLength={6}>
								<InputOTPGroup className="flex w-full items-center justify-between">
									<InputOTPSlot className="aspect-square h-full w-full" index={0} />
									<InputOTPSlot className="aspect-square h-full w-full" index={1} />
									<InputOTPSlot className="aspect-square h-full w-full" index={2} />
									<InputOTPSlot className="aspect-square h-full w-full" index={3} />
									<InputOTPSlot className="aspect-square h-full w-full" index={4} />
									<InputOTPSlot className="aspect-square h-full w-full" index={5} />
								</InputOTPGroup>
							</InputOTP>
							<Button className="self-start px-0" variant="link">
								Reenviar código
							</Button>
						</div>
						<DialogFooter className="mt-6">
							<DialogClose asChild>
								<Button variant="secondary">Cancelar</Button>
							</DialogClose>
							<Button
								type="submit"
								form="update-password"
								disabled={isSubmitButtonDisabled}
							>
								Confirmar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	)
}
