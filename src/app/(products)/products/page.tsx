'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { ROUTES } from '@/src/constants/routes'
import { ProductsList } from '@/src/modules/products/components/products-list'

export default function ProductPage() {
  const router = useRouter()

  return (
    <div className="p-4">
      <section className="flex items-center justify-between">
        <Input className="max-w-[420px]" placeholder="pesquisar produto" />
        <Button onClick={() => router.replace(ROUTES.product.new)}>
          novo produto
        </Button>
      </section>

      <section className="mt-6 flex flex-col gap-3">
        <ProductsList />
      </section>
    </div>
  )
}
