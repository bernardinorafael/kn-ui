import { Breadcrumb } from '@/src/components/breadcrumb.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert.tsx'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { ProductsList } from '@/src/modules/products/components/products-list.tsx'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Terminal } from 'lucide-react'
import { useDebouncedCallback as debounce } from 'use-debounce'
import { z } from 'zod'

const ProductSearchSchema = z.object({
  query: z.string().catch(''),
})

function ProductPage() {
  const navigate = useNavigate({ from: '/products' })

  const handleSearchProduct = debounce(async (query: string) => {
    await navigate({ search: { query } })
  }, 400)

  return (
    <>
      <Breadcrumb path={['produtos']} />

      <div className="flex flex-col gap-6 p-4">
        <section className="flex items-center justify-between">
          <Input
            className="max-w-[50%]"
            placeholder="buscar produto"
            onChange={(event) => handleSearchProduct(event.target.value)}
          />

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
  validateSearch(query: Record<string, unknown>) {
    return ProductSearchSchema.parse(query)
  },
})
