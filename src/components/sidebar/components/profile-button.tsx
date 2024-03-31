import { useSidebar } from '@/src/stores/use-sidebar'

import { cn } from '@/src/util/cn'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'

export function ProfileButton() {
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }))
  // const signOut = useAuth((store) => store.signOut)

  return (
    <div className="relative mt-auto flex items-center gap-2 p-3 text-sm">
      <Avatar
        className={cn({ 'translate-x-[8px] transition-all': !sidebar.expanded })}
      >
        <AvatarImage src="https://github.com/bernardinorafael.png" />
        <AvatarFallback>RB</AvatarFallback>
      </Avatar>

      <div
        className={cn('absolute flex flex-col pl-12 transition-all', {
          '-z-10 translate-x-[50%]': !sidebar.expanded,
        })}
      >
        <p className="font-semibold">Rafael</p>
        <p className="text-xs">rafael@gmail.com</p>
      </div>

      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon" className="ml-auto">
            <SignOut />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você realmente deseja sair?</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={signOut}>Quero sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  )
}
