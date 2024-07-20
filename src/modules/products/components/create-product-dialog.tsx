import { Camera, Trash } from "@phosphor-icons/react"
import React from "react"

import { Button } from "@/src/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/src/lib/axios"
import { FormError } from "@/src/components/form-error"
import { queryClient } from "@/src/lib/react-query"
import { cn } from "@/src/util/cn"
import { useFilesContext } from "@/src/hooks/use-files"

const createProductSchema = z.object({
	name: z.string().min(3, "O nome do produto precisa ter no mínimo 3 letras"),
	quantity: z.coerce.number().min(1, "A quantidade mínima é 1"),
	price: z.coerce.number().min(1, "O preço não pode ser menor que 1"),
})

export function CreateProductDialog() {
	const { file, onSelectFile, onResetFile } = useFilesContext()

	const [isDialogOpen, setIsDialogOpen] = React.useState(false)

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
			await queryClient.invalidateQueries({ queryKey: ["products"] })
			clearProductForm()
			setIsDialogOpen(false)
		} catch (err) {
			console.error(err)
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
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button size="default">Criar produto</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Criar um novo produto</DialogTitle>
				</DialogHeader>

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
						<p className="font-medium text-sm text-zinc-400">Imagem</p>
						<div className="h-24 w-24 cursor-pointer self-start">
							{file ? (
								<div className="relative h-full w-full">
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
											"top-1/2 left-1/2 h-8 w-8 rounded-full",
											"-translate-x-1/2 -translate-y-1/2 absolute"
										)}>
										<Trash size={18} weight="bold" />
									</Button>
								</div>
							) : (
								<label
									className={cn(
										"relative flex aspect-square h-full w-full cursor-pointer",
										"items-center justify-center rounded-lg border-2 border-dashed"
									)}>
									<Camera weight="fill" size={22} />
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

				<DialogFooter>
					<DialogClose asChild onClick={clearProductForm}>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
					<Button form="create-product" disabled={isButtonSaveProductDisabled}>
						Salvar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
