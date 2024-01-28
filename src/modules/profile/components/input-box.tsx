import { cn } from '@/src/util'

type InputBoxProps = React.ComponentProps<'div'>

export function InputBox({ className, ...props }: InputBoxProps) {
  return (
    <div className={cn('flex items-center justify-between', className)} {...props} />
  )
}
