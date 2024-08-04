import { z } from "zod"

export const otpLoginSchema = z.object({
	phone: z
		.string()
		.regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, "Favor inserir um telefone válido"),
})
