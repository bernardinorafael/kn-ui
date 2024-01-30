'use client'

import { useRouter } from 'next/navigation'

import { Breadcrumb } from '@/src/components/breadcrumb'
import { Button } from '@/src/components/ui/button'
import { ChevronLeft } from 'lucide-react'

type PageParams = {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: PageParams) {
  const router = useRouter()

  return (
    <>
      <Breadcrumb path={['produtos', 'editar produto']} />

      <div className="flex flex-col items-center gap-8 p-4">
        <div className="flex items-center gap-4">
          <h1>product: {params.id}</h1>

          <Button variant="link" onClick={() => router.back()}>
            <ChevronLeft size={16} />
            voltar
          </Button>
        </div>
      </div>
    </>
  )
}
