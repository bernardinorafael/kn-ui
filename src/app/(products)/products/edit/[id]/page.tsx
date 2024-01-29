'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/src/components/ui/button'

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-4 p-4">
      <h2>product: {params.id}</h2>

      <Button onClick={() => router.back()}>Voltar</Button>
    </div>
  )
}
