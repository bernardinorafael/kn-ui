import { Breadcrumb } from '@/src/components/breadcrumb'
import { NewProductModule } from '@/src/modules/new-product'

export default function NewProdutPage() {
  return (
    <>
      <Breadcrumb path={['produtos', 'criar produto']} />

      <div className="flex flex-col gap-6 p-4">
        <NewProductModule />
      </div>
    </>
  )
}
