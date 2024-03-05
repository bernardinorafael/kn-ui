import { createFileRoute } from '@tanstack/react-router'

import { CreateProductForm } from '@/src/modules/products/components/create-product-form.tsx'

export const Route = createFileRoute('/_dashboard/products/new')({
	component: NewProductPage,
})

export default function NewProductPage() {
	return (
		<>
			<div className="flex flex-col gap-6 p-4">
				<CreateProductForm />
			</div>
		</>
	)
}
