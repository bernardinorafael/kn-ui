import Link from 'next/link'

import { ROUTES } from '@/src/constants/routes'

export default function ProductPage() {
  return (
    <div>
      <Link href={ROUTES.product.new}>criar produto</Link>
    </div>
  )
}
