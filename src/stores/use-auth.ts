import { destroyCookie, setCookie } from 'nookies'
import { create } from 'zustand'

import { User } from '@/src/types/user'
import { api } from '@/src/lib/axios'

type RegisterProps = Pick<User, 'name' | 'email' | 'document'> & {
	password: string
}

type StoreProps = {
	user: User | null
	isSigned: boolean
	register(credentials: RegisterProps): void
	login(email: string, password: string): void
	signOut(): void
}

export const useAuth = create<StoreProps>((set) => ({
	isSigned: false,
	user: null,

	signOut() {
		destroyCookie(null, 'kn-token', { path: '/' })
		set({ isSigned: false })
		window.location.href = '/login'
	},

	async login(email, password) {
		const res = await api.post('/auth/login', { email, password })
		const access_token = res.data.access_token

		setCookie(null, 'kn-token', access_token, {
			/**
			 * 3 days token expiration
			 */
			maxAge: 60 * 60 * 72,
			path: '/',
		})

		api.defaults.headers.token = access_token
		set({ isSigned: true })
	},

	async register(credentials) {
		const res = await api.post('/auth/register', {
			name: credentials.name,
			email: credentials.email,
			document: credentials.document,
			password: credentials.password,
		})

		const access_token = res.data.access_token

		setCookie(null, 'kn-token', access_token, {
			/**
			 * 3 days token expiration
			 */
			maxAge: 60 * 60 * 72,
			path: '/',
		})

		api.defaults.headers.token = access_token
		set({ isSigned: true })
	},
}))
