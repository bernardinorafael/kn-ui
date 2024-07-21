import { Box } from "@/src/components/box"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { FormError } from "@/src/components/form-error"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useFilesContext } from "@/src/hooks/use-files"
import { api } from "@/src/lib/axios"
import { cn } from "@/src/util/cn"
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Trash } from "@phosphor-icons/react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { createProductSchema } from "../schemas/create-product-schema"

export function CreateProductForm() {
	const navigate = useNavigate({ from: "/products/new" })
	const { file, onSelectFile, onResetFile } = useFilesContext()

	function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
		if (!event.target.files?.length) return

		const file = event.target.files[0]
		onSelectFile(file)
	}

	const form = useForm<z.infer<typeof createProductSchema>>({
		resolver: zodResolver(createProductSchema),
	})

	function clearProductForm() {
		onResetFile()
		form.reset()
	}

	async function handleCreateProduct(data: z.infer<typeof createProductSchema>) {
		const formData = new FormData()

		formData.append("name", data.name)
		formData.append("price", String(data.price))
		formData.append("quantity", String(data.quantity))

		if (file) {
			formData.append("image", file)
		}

		try {
			await api.post("/products", formData)

			form.setFocus("name")
			clearProductForm()

			toast.success("Um novo produto foi criado")
		} catch (err) {
			if (isAxiosError(err)) {
				if (err.response?.data.error === "Conflict") {
					toast.error("O nome deste produto já está em uso", {
						description: "Verifique as informações e tente novamente",
					})
				}
			}
		}
	}

	const imagePreview = React.useMemo(() => {
		if (file) return URL.createObjectURL(file)
		return null
	}, [file])

	const errors = form.formState.errors
	const isCreatingProduct = form.formState.isSubmitting

	const isButtonSaveProductDisabled = !file || isCreatingProduct

	return (
		<Card className="max-w-[820px]">
			<CardHeader>
				<CardTitle>Informações do produto</CardTitle>
				<CardDescription>
					Informe os atributos e valores do novo produto
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Box>
					<form
						id="create-product"
						onSubmit={form.handleSubmit(handleCreateProduct)}
						className="my-4 flex flex-col gap-4">
						<Label>
							Nome
							<Input autoFocus {...form.register("name")} />
							{errors.name && <FormError>{errors.name.message}</FormError>}
						</Label>
						<div className="grid grid-cols-2 gap-3">
							<Label>
								Quantidade
								<Input type="number" {...form.register("quantity")} />
								{errors.quantity && <FormError>{errors.quantity.message}</FormError>}
							</Label>
							<Label>
								Preço
								<Input {...form.register("price")} />
								{errors.price && <FormError>{errors.price.message}</FormError>}
							</Label>
						</div>

						<div className="grid gap-2">
							<p className="font-medium text-sm">Imagem</p>
							<div
								className={cn(
									"h-24 cursor-pointer self-start rounded-lg bg-white",
									file && "w-24"
								)}>
								{file ? (
									<div className="group relative h-24 w-24">
										<img
											className="rounded-lg border border-zinc-200 shadow"
											src={String(imagePreview)}
											alt=""
										/>
										<Button
											size="icon"
											type="button"
											variant="destructive"
											onClick={onResetFile}
											className={cn(
												"absolute top-1/2 left-1/2 hidden h-8 w-8 rounded-full",
												"-translate-x-1/2 -translate-y-1/2 group-hover:flex"
											)}>
											<Trash size={18} weight="bold" />
										</Button>
									</div>
								) : (
									<label
										className={cn(
											"relative flex aspect-square h-full w-full cursor-pointer flex-col",
											"items-center justify-center rounded-lg border-2 border-dashed",
											"focus-within:ring focus-within:ring-black focus-within:ring-offset-2"
										)}>
										<Camera weight="fill" size={26} />
										<p className="font-medium text-sm">
											Selecione uma imagem para o produto
										</p>
										<input
											type="file"
											accept="image/*"
											className="sr-only"
											onChange={handleSelectImage}
										/>
									</label>
								)}
							</div>
							<p className="font-medium text-xs text-zinc-400">
								Quantidade mínima de 1 foto
							</p>
						</div>
					</form>
				</Box>
			</CardContent>
			<CardFooter>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => {
						onResetFile()
						navigate({ to: "/products", search: { disabled: false } })
					}}>
					Voltar
				</Button>
				<Button
					size="sm"
					type="submit"
					form="create-product"
					disabled={isButtonSaveProductDisabled}>
					Criar produto
				</Button>
			</CardFooter>
		</Card>
	)
}
