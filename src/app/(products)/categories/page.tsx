import { Breadcrumb } from '@/src/components/breadcrumb'

export default function CategoriesPage() {
  return (
    <>
      <Breadcrumb path={['categorias']} />

      <div className="p-4">
        <h1>minhas categorias</h1>
      </div>
    </>
  )
}
