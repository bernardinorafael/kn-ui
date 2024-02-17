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
import { cn } from '@/src/util'
import { createFileRoute } from '@tanstack/react-router'

export default async function EditProductPage() {
  const balance = 300

  return (
    <>
      <Breadcrumb path={['produtos', 'editar produto', 'meu produto']} />

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
              value={12}
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs font-medium text-zinc-800 dark:text-zinc-400">
              seu estoque atual é de 30 unidades
            </p>
          </CardFooter>
        </Card>

        <ViewProduct
          product={{
            stock: 1,
            name: 'product name',
            current_stock: 40,
            obs: null,
            active: true,
            brand: 'brand',
            id: '11',
            color: 'blue',
            category: 'category',
            price: 300,
            size: 'g',
            created_at: '2023/12/04',
          }}
        />
      </div>
    </>
  )
}

export const Route = createFileRoute('/products/$id')({
  component: EditProductPage,
})
