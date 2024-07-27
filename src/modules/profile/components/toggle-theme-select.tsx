import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select"
import { useTheme } from "next-themes"

export function ToggleThemeSelect() {
	const { setTheme, theme } = useTheme()

	return (
		<Select
			onValueChange={(value) => setTheme(value)}
			defaultValue={theme || "system"}
		>
			<SelectTrigger className="w-[260px]">
				<SelectValue placeholder="selecionar" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Claro</SelectItem>
				<SelectItem value="dark">Escuro</SelectItem>
				<SelectItem value="system">Sistema</SelectItem>
			</SelectContent>
		</Select>
	)
}
