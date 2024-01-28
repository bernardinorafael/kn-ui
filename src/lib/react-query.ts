import { QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

let displayedNetworkFailureError = false

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount) {
        if (failureCount >= 3) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true
            toast.error('ocorreu um erro de conexão!', {
              description: 'tente novamente em alguns instantes.',
            })
          }
          return false
        }
        return true
      },
    },
  },
})
