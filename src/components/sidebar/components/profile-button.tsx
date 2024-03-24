import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'

export function ProfileButton() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="mt-auto flex items-center gap-3 self-start font-medium">
					<Avatar>
						<AvatarFallback className="bg-white text-black">RB</AvatarFallback>
					</Avatar>
					<p>Rafael Bernardino</p>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				sideOffset={10}
				className="w-[190px]"
				side="right"
			>
				<DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Preferências</DropdownMenuItem>
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuCheckboxItem
									checked={theme === 'light'}
									onClick={() => setTheme('light')}
								>
									Claro
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={theme === 'dark'}
									onClick={() => setTheme('dark')}
								>
									Escuro
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={theme === 'system'}
									onClick={() => setTheme('system')}
								>
									Sistema
								</DropdownMenuCheckboxItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Sair
					<DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
