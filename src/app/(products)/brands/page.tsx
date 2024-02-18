import { Breadcrumb } from '@/src/components/breadcrumb'

export default function BrandsPage() {
  return (
    <>
      <Breadcrumb path={['marcas']} />

      <div className="p-4">
        <h1>minhas marcas</h1>
      </div>
    </>
  )
}
