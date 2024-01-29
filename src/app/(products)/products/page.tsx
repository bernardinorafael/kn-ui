'use client'

import React from 'react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { ROUTES } from '@/src/constants/routes'
import { ProductsList } from '@/src/modules/products/components/products-list'
import { ProductsListSkeleton } from '@/src/modules/products/components/products-list-skeleton'
import { Terminal } from 'lucide-react'

export default function ProductPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <section className="flex items-center justify-between">
        <div className="flex w-full max-w-[50%] items-center gap-2">
          <Input placeholder="pesquisar produto" />
          <Button size="default" variant="outline">
            buscar
          </Button>
        </div>

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
          <ProductsList />
        </React.Suspense>
      </section>
    </div>
  )
}
