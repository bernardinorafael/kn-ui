'use client'

import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button'
import { ChevronLeft, Terminal } from 'lucide-react'

type PageParams = {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: PageParams) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex items-center gap-4">
        <h1>product: {params.id}</h1>

        <Button variant="link" onClick={() => router.back()}>
          <ChevronLeft size={16} />
          voltar
        </Button>
      </div>

      <section>
        <Alert className="self-start">
          <Terminal className="h-4 w-4" />
          <AlertTitle>este é um teste!</AlertTitle>
          <AlertDescription>
            lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
            eligendi!
          </AlertDescription>
        </Alert>

        <Alert className="self-start">
          <Terminal className="h-4 w-4" />
          <AlertTitle>este é um teste de uma segunda PR!</AlertTitle>
          <AlertDescription>
            lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
            eligendi!
          </AlertDescription>
        </Alert>
      </section>
    </div>
  )
}
