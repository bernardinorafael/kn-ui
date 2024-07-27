import { z } from "zod"

/**
 * TODO: validate Document
 */
export const registerSchema = z.object({
	name: z.string().min(3, "Mínimo de 3 letras"),
	email: z.string().email("Digite um e-mail válido"),
	phone: z
		.string()
		.regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, "Favor inserir um telefone válido"),
	document: z.string(),
	password: z.string().min(6, "Sua senha precisa ter no mínimo 6 caracteres"),
})
