import { z } from "zod"

export const RegisterSchema = z.object({
	name: z.string().min(3, "Mínimo de 3 letras"),
	surname: z.string().min(2, "Mínimo de 2 letras"),
	document: z.string().min(11).max(11),
	email: z.string().email("Digite um e-mail válido"),
	password: z.string().min(8, "Sua senha precisa ter no mínimo 8 caracteres"),
})
