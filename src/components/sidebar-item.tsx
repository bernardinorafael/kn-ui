import Link from 'next/link'

import { cn } from '../util'

type SidebarItemProps = React.ComponentProps<typeof Link> & {
  label: string
  isActive?: boolean
}

export function SidebarItem(props: SidebarItemProps) {
  const { className, label, isActive, ...rest } = props

  return (
    <Link
      className={cn(
        'flex items-center text-zinc-500 hover:text-black',
        { 'text-black': isActive },
        className,
      )}
      {...rest}
    >
      <span className="pt-1 text-sm font-medium">{label}</span>
      {isActive && (
        <div className="ml-auto h-[20px] w-1 rounded-bl-lg rounded-tl-lg bg-zinc-950" />
      )}
    </Link>
  )
}
