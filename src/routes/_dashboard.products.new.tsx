import { Breadcrumb } from '@/src/components/breadcrumb.tsx'
import { CreateProductForm } from '@/src/modules/products/components/create-product-form.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/products/new')({
  component: NewProductPage,
})

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
