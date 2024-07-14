import { House } from "@phosphor-icons/react/dist/ssr"
import { createFileRoute } from "@tanstack/react-router"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"
import { Button } from "@/src/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { Box } from "@/src/modules/auth/components/box.tsx"
import { UpdateProfileForm } from "@/src/modules/profile/form/update-profile-form.tsx"
import { useSidebar } from "@/src/stores/use-sidebar.ts"
import { cn } from "@/src/util/cn"

export const Route = createFileRoute("/_dashboard/profile")({
	component: ProfilePage,
})

const items = ["Informações pessoais", "Informações do perfil", "Atualizar senha"]

function ProfilePage() {
	const sidebar = useSidebar((store) => ({ expanded: store.expanded }))

	return (
		<div
			className={cn(
				"mx-auto w-full max-w-[1292px] space-y-12",
				"self-end p-8 transition-width duration-300",
				!sidebar.expanded && "max-w-[1500px]"
			)}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<House size={16} />
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Preferências</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex items-start justify-between gap-12">
				<aside className="flex w-full max-w-[320px] flex-col items-start">
					{items.map((item) => (
						<Button
							key={item}
							variant="ghost"
							className="w-full justify-start font-normal text-base">
							{item}
						</Button>
					))}
				</aside>

				<Card>
					<CardHeader>
						<CardTitle>Informações do perfil</CardTitle>
						<CardDescription>
							Altere aqui as informações do seu perfil
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Box>
							<UpdateProfileForm />
						</Box>
					</CardContent>
					<CardFooter>
						<Button size="sm" variant="secondary">
							Resetar
						</Button>
						<Button size="sm" type="submit" form="update-profile">
							Salvar alterações
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
