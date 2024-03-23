import { router } from '@/src/app'

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
