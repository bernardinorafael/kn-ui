import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type LayoutOptions = "shorter" | "short" | "long"

export function formatDate(date: Date | string, layout?: LayoutOptions) {
	const layouts = {
		short: "PP",
		shorter: "dd/MM/yyyy",
		long: "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
	}

	return format(date, layouts[layout || "shorter"], {
		locale: ptBR,
	})
}
