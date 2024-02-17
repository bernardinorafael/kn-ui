import React from 'react'

import { Breadcrumb } from '@/src/components/breadcrumb.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert.tsx'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { fetchProducts } from '@/src/modules/products/helper/fetch-products.ts'
import { ProductsSkeleton } from '@/src/modules/products/skeletons/products-skeleton.tsx'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Terminal } from 'lucide-react'

function ProductPage() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  return (
    <>
      <Breadcrumb path={['produtos']} />

      <div className="flex flex-col gap-6 p-4">
        <section className="flex items-center justify-between">
          <Input placeholder="buscar produto" className="max-w-[50%]" />

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

        <React.Suspense fallback={<ProductsSkeleton />}>
          {products &&
            products.map((product) => {
              return <p>{product.id}</p>
            })}
        </React.Suspense>
      </div>
    </>
  )
}

export const Route = createFileRoute('/products/')({
  component: ProductPage,
})
