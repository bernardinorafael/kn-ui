type FormErrorProps = React.ComponentProps<'span'>

export function FormError(props: FormErrorProps) {
  return (
    <span
      role="status"
      className="text-xs font-medium text-red-500 dark:text-red-700"
      {...props}
    />
  )
}
