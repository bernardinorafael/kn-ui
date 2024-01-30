import { Breadcrumb } from '@/src/components/breadcrumb'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { Progress } from '@/src/components/ui/progress'
import { ViewProduct } from '@/src/modules/products/components/view-product'
import { getProduct } from '@/src/modules/products/helper/get-product'
import { cn } from '@/src/util'

type PageParams = {
  params: {
    id: string
  }
}

export default async function EditProductPage({ params }: PageParams) {
  const product = await getProduct(params.id)

  const balance = (product.current_stock / product.stock) * 100

  return (
    <>
      <Breadcrumb path={['produtos', 'editar produto', product.name]} />

      <div className="flex flex-col gap-6 p-4">
        <Card>
          <CardHeader>
            <CardTitle>estoque do produto</CardTitle>
            <CardDescription>
              visualize o estoque deste produto em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress
              indicatorClassName={cn({ 'bg-red-500': balance <= 40 })}
              value={balance}
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs font-medium text-zinc-800 dark:text-zinc-400">
              seu estoque atual é de {product.current_stock} unidades
            </p>
          </CardFooter>
        </Card>

        <ViewProduct product={product} />
      </div>
    </>
  )
}
