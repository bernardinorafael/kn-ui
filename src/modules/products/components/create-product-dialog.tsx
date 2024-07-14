import { Plus, Camera } from "@phosphor-icons/react"

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
import { sleep } from "@/src/util/sleep"

const createProductSchema = z.object({
	name: z.string(),
	quantity: z.number(),
	price: z.number(),
})

export function CreateProductDialog() {
	const form = useForm<z.infer<typeof createProductSchema>>({
		resolver: zodResolver(createProductSchema),
	})

	async function handleCreateProduct(data: z.infer<typeof createProductSchema>) {
		await sleep(400)
		console.log(data)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="default">
					<Plus weight="bold" size={15} />
					Criar produto
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Criar um novo produto</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={form.handleSubmit(handleCreateProduct)}
					className="my-4 flex flex-col gap-4">
					<Label>
						Nome
						<Input autoFocus {...form.register("name")} />
					</Label>
					<div className="grid grid-cols-2 gap-3">
						<Label>
							Quantidade
							<Input {...form.register("quantity")} />
						</Label>
						<Label>
							Preço
							<Input {...form.register("price")} />
						</Label>
					</div>

					<Label className="cursor-pointer self-start">
						Imagem
						<div className="flex aspect-square h-20 items-center justify-center rounded-lg border-2 border-dashed">
							<Camera weight="fill" size={22} />
							<input type="file" className="sr-only" />
						</div>
					</Label>
				</form>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
					<Button>Salvar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
