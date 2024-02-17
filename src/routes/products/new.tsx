import { Breadcrumb } from '@/src/components/breadcrumb'
import { CreateProductForm } from '@/src/modules/products/components/create-product-form.tsx'
import { createFileRoute } from '@tanstack/react-router'

export default function NewProductPage() {
  return (
    <>
      <Breadcrumb path={['produtos', 'criar produto']} />

      <div className="flex flex-col gap-6 p-4">
        <CreateProductForm />
      </div>
    </>
  )
}

export const Route = createFileRoute('/products/new')({
  component: NewProductPage,
})
