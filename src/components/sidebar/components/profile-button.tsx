import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { useAuth } from "@/src/stores/use-auth"
import { useSidebar } from "@/src/stores/use-sidebar"
import { cn } from "@/src/util/cn"
import { SignOut as SignOutIcon } from "@phosphor-icons/react"

import { AlertDialogFooter, AlertDialogHeader } from "../../ui/alert-dialog"

export function ProfileButton() {
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	const { signOut, user } = useAuth((store) => ({
		getSigned: store.getSigned,
		signOut: store.signOut,
		user: store.user,
	}))

	function getInitialsName(name: string) {
		const splitted = name.split(" ")
		return splitted[0].charAt(0) + splitted[1].charAt(0)
	}

	return (
		<Popover>
			<PopoverTrigger className="group mt-auto flex items-center gap-2 p-3 text-sm focus-visible:outline-none">
				<Avatar>
					{user && (
						<AvatarFallback className="bg-white uppercase">
							{getInitialsName(user.name)}
						</AvatarFallback>
					)}
				</Avatar>

				<div
					className={cn(
						"absolute flex flex-col items-start pl-12 transition-all duration-150",
						!sidebar.expanded && "-z-10 translate-x-[50%]"
					)}
				>
					<h2 className="mt-1 font-semibold capitalize underline-offset-2 group-hover:underline">
						{user?.name}
					</h2>
				</div>
			</PopoverTrigger>

			<PopoverContent
				align={sidebar.expanded ? "start" : "end"}
				side={sidebar.expanded ? "top" : "right"}
			>
				<div className="flex items-center gap-3">
					<Avatar>
						<AvatarFallback className="bg-white">RB</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-start">
						<h3 className="font-semibold capitalize">{user?.name}</h3>
						<p className="text-xs">{user?.email}</p>
					</div>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button size="icon" variant="destructive" className="ml-auto h-8 w-8">
								<SignOutIcon size={18} weight="bold" />
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
					</AlertDialog>
				</div>
			</PopoverContent>
		</Popover>
	)
}
