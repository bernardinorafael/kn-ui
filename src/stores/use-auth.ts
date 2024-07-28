import { api } from "@/src/lib/axios"
import type { User } from "@/src/types/user"
import { isAxiosError } from "axios"
import { destroyCookie, setCookie } from "nookies"
import { toast } from "sonner"
import { create } from "zustand"

type RegisterProps = Pick<User, "name" | "email" | "document" | "phone"> & {
	password: string
}

type StoreProps = {
	user: User | null
	isSignedIn: boolean
	register(credentials: RegisterProps): void
	login(email: string, password: string): void
	getSigned(): Promise<void>
	signOut(): void
}

export const useAuth = create<StoreProps>((set) => ({
	isSignedIn: false,
	user: null,

	signOut() {
		destroyCookie(null, "kn-token", { path: "/" })
		set({ isSignedIn: false })
		window.location.href = "/login"
	},

	async getSigned() {
		try {
			const res = await api.get("/users/me")
			set({ user: res.data.user, isSignedIn: true })
		} catch (err) {
			if (isAxiosError(err)) {
				toast.error("Ocorreu um erro ao tentar efetuar o login", {
					description: "Por favor, tente novamente mais tarde",
				})
			}
		}
	},

	async login(email, password) {
		try {
			const res = await api.post("/auth/login", { email, password })
			const accessToken = res.data.token

			setCookie(null, "kn-token", accessToken, {
				/**
				 * 3 days token expiration
				 */
				maxAge: 60 * 60 * 72,
				path: "/",
			})

			api.defaults.headers.token = accessToken
			set({ isSignedIn: true })

			window.location.href = "/products"
		} catch (err) {
			if (isAxiosError(err)) {
				if (err.response?.data.code === 409) {
					toast.error("Credenciais inválidas")
					return
				}
				toast.error("Ocorreu um erro ao tentar efetuar o login", {
					description: "Por favor, tente novamente mais tarde",
				})
			}
		}
	},

	async register(credentials) {
		try {
			await api.post("/auth/register", {
				name: credentials.name,
				email: credentials.email,
				phone: credentials.phone,
				document: credentials.document,
				password: credentials.password,
			})

			toast.success("Usuário criado com sucesso", {
				description: "Navegue até a tela de Login para entrar",
			})
		} catch (err) {
			if (isAxiosError(err)) {
				if (err.response?.data.code === 409) {
					toast.error("Credenciais inválidas")
					return
				}
				toast.error("Ocorreu um erro ao tentar efetuar o login", {
					description: "Por favor, tente novamente mais tarde",
				})
			}
		}
	},
}))
