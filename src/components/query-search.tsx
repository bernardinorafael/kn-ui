'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Input } from '@/src/components/ui/input'
import { useDebouncedCallback } from 'use-debounce'

type QuerySearchProps = {
  placeholder: string
  queryKey: string
}

export function QuerySearch({ queryKey, placeholder }: QuerySearchProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const onSetQueryParam = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams)

    if (query) {
      params.set(queryKey, query)
    } else {
      params.delete(queryKey)
    }

    router.replace(`${pathname}?${params}`)
  }, 400)

  return (
    <Input
      className="max-w-[50%]"
      defaultValue={searchParams.get(queryKey)?.toString()}
      onChange={(event) => onSetQueryParam(event.target.value)}
      placeholder={placeholder}
    />
  )
}
