import { z } from "zod"

export const updateProfileSchema = z.object({
	name: z
		.string()
		.min(3, "Seu nome precisa ter no mínimo 3 letras")
		.transform((name) => name.trim()),
	email: z.string().email("Favor inserir um e-mail válido"),
	phone: z
		.string()
		.regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, "Favor inserir um telefone válido"),
})
