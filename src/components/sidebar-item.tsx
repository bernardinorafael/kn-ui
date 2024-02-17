import { cn } from '../util'

type SidebarItemProps = React.ComponentProps<'div'>

export function SidebarItem(props: SidebarItemProps) {
  const { className, children, ...rest } = props

  return (
    <div
      className={cn(
        'flex cursor-default items-center text-zinc-500 hover:text-black',
        'dark:hover:text-white',
        className,
      )}
      {...rest}
    >
      <span className="flex items-center justify-center gap-2 pt-1 text-sm font-medium">
        {children}
      </span>
    </div>
  )
}
