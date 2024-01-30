'use client'

import { Label } from '@/src/components/ui/label'
import { Switch } from '@/src/components/ui/switch'
import { toast } from 'sonner'

type ChangeStatusProductProps = {
  productId: string
  active: boolean
}

export function ChangeStatusProduct(props: ChangeStatusProductProps) {
  const onChangeProductStatus = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    toast.success('seu produto foi desativado!')
  }

  return (
    <Label className="mr-auto flex items-center gap-2">
      desativar produto
      <Switch onClick={onChangeProductStatus} defaultChecked={props.active} />
    </Label>
  )
}
