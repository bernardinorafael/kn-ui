import { z } from "zod"

export const createProductSchema = z.object({
	name: z.string().min(3, "O nome do produto precisa ter no mínimo 3 letras"),
	quantity: z.coerce.number().min(1, "A quantidade mínima permitida é 1"),
	price: z.coerce.number().min(1, "O preço deve ser no mínimo 1"),
})
