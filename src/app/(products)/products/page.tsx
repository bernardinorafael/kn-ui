'use client'

import React from 'react'
import Link from 'next/link'

import { QuerySearch } from '@/src/components/query-search'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button'
import { ROUTES } from '@/src/constants/routes'
import { ProductsList } from '@/src/modules/products/components/products-list'
import { ProductsListSkeleton } from '@/src/modules/products/components/products-list-skeleton'
import { Terminal } from 'lucide-react'

export default function ProductPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  return (
    <div className="flex flex-col gap-6 p-4">
      <section className="flex items-center justify-between">
        <QuerySearch queryKey="q" placeholder="buscar produto" />
        <Button asChild>
          <Link href={ROUTES.product.new}>criar produto</Link>
        </Button>
      </section>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>aqui estão seus produtos!</AlertTitle>
        <AlertDescription>
          você pode editar, excluir e visualizar mais informações clicando no item.
        </AlertDescription>
      </Alert>

      <section className="flex flex-col gap-3">
        <React.Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList query={searchParams.q} />
        </React.Suspense>
      </section>
    </div>
  )
}
