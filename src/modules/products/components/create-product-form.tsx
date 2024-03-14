import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { currency } from 'remask'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/src/lib/axios'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/src/components/ui/select'
import { Textarea } from '@/src/components/ui/textarea'
import { CurrencyInput } from '@/src/components/currency-input'
import { FormError } from '@/src/components/form-error'
import { Loading } from '@/src/components/loading'
import { Box } from '@/src/modules/auth/components/box.tsx'
import { NewProductSchema } from '@/src/modules/products/schemas/new-product-schema.ts'

export function CreateProductForm() {
	const navigate = useNavigate({ from: '/products/new' })
	const [currencyValue, setCurrencyValue] = React.useState('')

	const form = useForm<z.infer<typeof NewProductSchema>>({
		resolver: zodResolver(NewProductSchema),
	})

	async function handleCreateNewProduct(data: z.infer<typeof NewProductSchema>) {
		try {
			await api.post('/products', {
				name: data.name,
				size: data.size,
				active: true,
				created_at: new Date(),
				brand: data.brand,
				color: data.color,
				stock: data.stock,
				current_stock: data.stock,
				category: data.category,
				obs: data.obs || null,
				price: currency.unmask({
					locale: 'pt-BR',
					currency: 'BRL',
					value: data.price,
				}),
			})

			toast.success('produto cadastrado com sucesso!', {
				description: 'seu produto já pode ser visualizado na seção de produtos',
			})

			await navigate({ to: '/products', search: { query: '' } })
		} catch (err) {
			if (isAxiosError(err)) {
				// TODO: handler errors here
				console.error(err)
			}
		}
	}

	const isLoading = form.formState.isSubmitting
	const errors = form.formState.errors

	return (
		<Box className="max-w-[920px]" title="informações do produto">
			<form
				id="new-product"
				className="flex flex-col gap-4 p-4"
				onSubmit={form.handleSubmit(handleCreateNewProduct)}
			>
				<Label className="flex w-full items-center justify-between gap-2">
					Nome
					<div className="flex w-full max-w-[520px] flex-col gap-2">
						<Input autoFocus {...form.register('name')} />
						{errors.name && <FormError>{errors.name.message}</FormError>}
					</div>
				</Label>

				<Label className="flex w-full items-center justify-between gap-2">
					Preço
					<div className="flex w-full max-w-[520px] flex-col gap-2">
						<CurrencyInput asChild value={currencyValue} onChange={setCurrencyValue}>
							<Input {...form.register('price')} />
						</CurrencyInput>
						{errors.price && <FormError>{errors.price.message}</FormError>}
					</div>
				</Label>

				<Label className="flex w-full items-center justify-between gap-2">
					Marca
					<div className="flex w-full max-w-[520px] flex-col gap-2">
						<Input {...form.register('brand')} />
						{errors.brand && <FormError>{errors.brand.message}</FormError>}
					</div>
				</Label>

				<Label className="flex w-full items-center justify-between gap-2">
					Categoria
					<Controller
						name="category"
						control={form.control}
						render={({ field }) => (
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="selecionar categoria" />
								</SelectTrigger>
								<SelectContent className="max-w-[520px]">
									<SelectItem value="shoes">calçados</SelectItem>
									<SelectItem value="tshirt">camisetas e vestuário</SelectItem>
									<SelectItem value="intern-use">uso interno</SelectItem>
									<SelectItem value="accessories">acessórios</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					{errors.category && <FormError>{errors.category.message}</FormError>}
				</Label>

				<Label className="flex w-full items-center justify-between gap-2">
					Tamanho
					<div className="flex w-full max-w-[520px] flex-col gap-2">
						<Input {...form.register('size')} />
						{errors.size && <FormError>{errors.size.message}</FormError>}
					</div>
				</Label>

				<Label className="flex w-full items-center justify-between gap-2">
					Cor
					<Controller
						name="color"
						control={form.control}
						render={({ field }) => (
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="selecionar cor" />
								</SelectTrigger>
								<SelectContent className="max-w-[520px]">
									<SelectItem value="blue">azul</SelectItem>
									<SelectItem value="green">verde</SelectItem>
									<SelectItem value="yellow">amarelo</SelectItem>
									<SelectItem value="pink">rosa</SelectItem>
									<SelectItem value="black">preto</SelectItem>
									<SelectItem value="red">vermelho</SelectItem>
									<SelectItem value="gray">cinza</SelectItem>
									<SelectItem value="white">branco</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					{errors.color && <FormError>{errors.color.message}</FormError>}
				</Label>

				<Label className="flex w-full items-center justify-between gap-2">
					Quantidade
					<div className="flex w-full max-w-[520px] flex-col gap-2">
						<Input {...form.register('stock')} />
						{errors.stock && <FormError>{errors.stock.message}</FormError>}
					</div>
				</Label>

				<Label className="flex w-full items-center justify-between gap-2">
					Observações
					<div className="flex w-full max-w-[520px] flex-col gap-2">
						<Textarea {...form.register('obs')} />
					</div>
				</Label>
			</form>

			<footer className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
				<Button asChild variant="outline" disabled={form.formState.isSubmitting}>
					<Link search to="/products">
						Cancelar
					</Link>
				</Button>

				<Button type="submit" form="new-product" disabled={isLoading}>
					{form.formState.isSubmitting ? <Loading /> : 'Cadastrar'}
				</Button>
			</footer>
		</Box>
	)
}
