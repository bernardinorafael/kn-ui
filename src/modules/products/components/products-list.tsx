import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import { ProductsSkeleton } from '@/src/modules/products/skeletons/products-skeleton.tsx'
import { getProducts } from '@/src/modules/products/utils/get-products.ts'
import { formatCurrency } from '@/src/util'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

export function ProductsList() {
  const products = useQuery({ queryKey: ['products'], queryFn: getProducts })

  const dateDifferenceFromNow = (date: string) => dayjs(date).fromNow()

  return (
    <>
      {products.isLoading ? (
        <ProductsSkeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>nome</TableHead>
              <TableHead>marca</TableHead>
              <TableHead>qtd</TableHead>
              <TableHead>criado em</TableHead>
              <TableHead>preço</TableHead>
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
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </>
  )
}
