type FormErrorProps = React.ComponentProps<'span'>

export function FormError(props: FormErrorProps) {
  return (
    <span
      className="text-xs font-medium text-red-500 dark:text-red-700"
      {...props}
    />
  )
}
