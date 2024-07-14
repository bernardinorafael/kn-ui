import { QueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

let displayedNetworkFailureError = false

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry(failureCount) {
				if (failureCount >= 1) {
					if (displayedNetworkFailureError === false) {
						displayedNetworkFailureError = true
						toast.error("Erro de conexão!", {
							description: "O carregamento está demorando mais que o esperado",
						})
					}
					return false
				}
				return true
			},
		},
	},
})
