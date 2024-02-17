import { Breadcrumb } from '@/src/components/breadcrumb.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert.tsx'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { ProductsList } from '@/src/modules/products/components/products-list.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Terminal } from 'lucide-react'

function ProductPage() {
  return (
    <>
      <Breadcrumb path={['produtos']} />

      <div className="flex flex-col gap-6 p-4">
        <section className="flex items-center justify-between">
          <Input className="max-w-[50%]" placeholder="buscar produto" />

          <Button asChild>
            <Link to="/products/new">criar produto</Link>
          </Button>
        </section>

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>aqui estão seus produtos!</AlertTitle>
          <AlertDescription>
            você pode editar, excluir e visualizar mais informações clicando no item.
          </AlertDescription>
        </Alert>

        <ProductsList />
      </div>
    </>
  )
}

export const Route = createFileRoute('/products/')({
  component: ProductPage,
})
