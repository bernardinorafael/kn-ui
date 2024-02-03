import { redirect } from 'next/navigation'

import { Breadcrumb } from '../components/breadcrumb'
import { ROUTES } from '../constants/routes'

export default async function HomePage() {
  redirect(ROUTES.product.home)

  return (
    <>
      <Breadcrumb path={['início']} />
    </>
  )
}
