import { env } from "@/src/env"
import axios from "axios"
import { parseCookies } from "nookies"

const { "kn-token": token } = parseCookies()

export const api = axios.create({
	baseURL: env.VITE_SERVER_URL,
	headers: {
		Authorization: token,
	},
})
