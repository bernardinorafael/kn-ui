import { redirect } from 'next/navigation'

import { ROUTES } from '../constants/routes'

export default async function HomePage() {
  redirect(ROUTES.product.home)

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  )
}
