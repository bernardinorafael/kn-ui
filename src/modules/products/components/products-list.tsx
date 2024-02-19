import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import { EmptyProductsFallback } from '@/src/modules/products/components/empty-products-fallback.tsx'
import { ProductsSkeleton } from '@/src/modules/products/skeletons/products-skeleton.tsx'
import { getProducts } from '@/src/modules/products/utils/get-products.ts'
import { formatCurrency } from '@/src/util'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import dayjs from 'dayjs'

const route = getRouteApi('/_dashboard/products/')

export function ProductsList() {
  const { query } = route.useSearch()

  const products = useQuery({
    queryKey: ['products', query],
    queryFn: () => getProducts({ query }),
  })

  const dateDifferenceFromNow = (date: string) => dayjs(date).fromNow()

  const isLoadingProducts = products.isFetching && !products.isFetched
  const totalAmount = products.data?.reduce((acc, curr) => acc + curr.price, 0)

  if (products.data?.length === 0) return <EmptyProductsFallback query={query} />

  return (
    <>
      {isLoadingProducts ? (
        <ProductsSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>nome</TableHead>
              <TableHead>marca</TableHead>
              <TableHead>qtd</TableHead>
              <TableHead>criado em</TableHead>
              <TableHead className="text-right">preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data?.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.current_stock} un</TableCell>
                  <TableCell>{dateDifferenceFromNow(product.created_at)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(product.price)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>total</TableCell>
              <TableCell className="text-right">
                {formatCurrency(totalAmount ?? 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  )
}
