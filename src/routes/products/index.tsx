import React from 'react'

import { Breadcrumb } from '@/src/components/breadcrumb.tsx'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert.tsx'
import { Button } from '@/src/components/ui/button.tsx'
import { Input } from '@/src/components/ui/input.tsx'
import { ROUTES } from '@/src/constants/routes.ts'
import { ProductsSkeleton } from '@/src/modules/products/skeletons/products-skeleton.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Terminal } from 'lucide-react'

function ProductPage() {
  return (
    <>
      <Breadcrumb path={['produtos']} />

      <div className="flex flex-col gap-6 p-4">
        <section className="flex items-center justify-between">
          <Input className="max-w-[50%]" />

          <Button asChild>
            <Link to={ROUTES.product.new}>criar produto</Link>
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
          {/* <ProductsList query="query test" /> */}
        </React.Suspense>
      </div>
    </>
  )
}

export const Route = createFileRoute('/products/')({
  component: ProductPage,
})
