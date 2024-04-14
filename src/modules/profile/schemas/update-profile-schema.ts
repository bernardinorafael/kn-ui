import { z } from "zod";

export const updateProfileSchema = z.object({
	name: z
		.string()
		.min(3, "Seu nome precisa ter no mínimo 3 letras")
		.regex(/^\S+$/, "Insira apenas seu primeiro nome")
		.transform((name) => name.trim()),
	surname: z
		.string()
		.min(3, "Seu sobrenome precisa ter no mínimo 3 letras")
		.transform((surname) => surname.trim()),
	email: z.string().email("Favor inserir um e-mail válido"),
	document: z.string(),
	username: z.string(),
	phone: z
		.string()
		.regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, "Favor inserir um telefone válido"),
});
