'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { ROUTES } from '@/src/constants/routes'
import { ProductsList } from '@/src/modules/products/components/products-list'
import { ProductsListSkeleton } from '@/src/modules/products/components/products-list-skeleton'
import { Search, Terminal } from 'lucide-react'

export default function ProductPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6 p-4">
      <section className="flex items-center justify-between">
        <div className="flex w-full max-w-[450px] items-center gap-2">
          <Input placeholder="pesquisar produto" />
          <Button variant="outline" size="icon">
            <Search size={16} />
          </Button>
        </div>
        <Button onClick={() => router.replace(ROUTES.product.new)}>
          novo produto
        </Button>
      </section>

      <Alert className="self-start">
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
