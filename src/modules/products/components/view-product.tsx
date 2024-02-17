import { Box } from '@/src/components/box'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Textarea } from '@/src/components/ui/textarea'
import { ROUTES } from '@/src/constants/routes'
import { Product } from '@/src/types/product'
import { formatCurrency } from '@/src/util'
import { Link } from '@tanstack/react-router'

export function ViewProduct({ product }: { product: Product }) {
  return (
    <Box className="max-w-full" title="informações do produto">
      <form className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-3 gap-4">
          <Label className="grid gap-2">
            name
            <Input disabled value={product.name} />
          </Label>
          <Label className="grid gap-2">
            preço
            <Input disabled value={formatCurrency(product.price)} />
          </Label>
          <Label className="grid gap-2">
            marca
            <Input disabled value={product.brand} />
          </Label>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label className="grid gap-2">
            categoria
            <Input disabled value={product.category} />
          </Label>
          <Label className="grid gap-2">
            tamanho
            <Input disabled value={product.size} />
          </Label>
          <Label className="grid gap-2">
            cor
            <Input disabled value={product.color} />
          </Label>
          <Label className="grid gap-2">
            quantidade total
            <Input disabled value={product.stock + ' unidades'} />
          </Label>
        </div>

        {product.obs && (
          <Label className="grid gap-2">
            observações
            <Textarea disabled defaultValue={product.obs} />
          </Label>
        )}
      </form>

      <footer className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
        <Button asChild variant="outline">
          <Link to={ROUTES.product.home}>voltar</Link>
        </Button>
      </footer>
    </Box>
  )
}
