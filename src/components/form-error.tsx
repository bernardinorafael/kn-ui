import React from 'react'

type FormErrorProps = React.ComponentProps<'p'>

export function FormError(props: FormErrorProps) {
  return (
    <p
      role="status"
      className="text-xs font-medium text-red-500 dark:text-red-700"
      {...props}
    />
  )
}
