import { Skeleton } from '@/src/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table.tsx'

export function ProductsSkeleton() {
  return (
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
        {[...Array(10)].map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <Skeleton className="h-[20px] w-full max-w-[140px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full max-w-[140px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full max-w-[110px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full max-w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-[20px] w-full max-w-[130px]" />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
