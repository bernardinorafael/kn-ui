import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/components/ui/alert-dialog'
import { LogOut } from 'lucide-react'

import { cn } from '../util'
import { SidebarItem } from './sidebar-item'

export function Sidebar() {
  return (
    <aside className="h-full w-[390px] border-r border-zinc-300 dark:border-zinc-800 1600px:w-[290px]">
      <section
        className={cn(
          'flex h-11 items-center border-b border-zinc-300 px-4 dark:border-zinc-800',
        )}
      >
        <h2 className="text-xl font-semibold">kn.co</h2>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0 dark:border-zinc-800">
        <span className="text-sm font-medium tracking-tight text-zinc-400">
          estoque
        </span>
        <div className="flex flex-col gap-1">
          <SidebarItem to="/products" activeProps={{ style: { color: '#fff' } }}>
            meus produtos
          </SidebarItem>
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0 dark:border-zinc-800">
        <span className="text-sm font-medium tracking-tight text-zinc-400">
          minha conta
        </span>
        <div className="flex flex-col gap-1">
          <SidebarItem to="/profile" activeProps={{ style: { color: '#fff' } }}>
            preferências
          </SidebarItem>
        </div>
      </section>

      <section className="flex flex-col gap-2 border-b border-zinc-300 p-4 pr-0 dark:border-zinc-800">
        <span className="text-sm font-medium tracking-tight text-zinc-400">
          oi, rafael!
        </span>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <SidebarItem>
              <LogOut size={14} />
              sair
            </SidebarItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>você realmente deseja sair?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>cancelar</AlertDialogCancel>
              <AlertDialogAction>quero sair</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </aside>
  )
}
