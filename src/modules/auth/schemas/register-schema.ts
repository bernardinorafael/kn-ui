import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 letras"),
  email: z.string().email("Digite um e-mail válido"),
  document: z.string(),
  password: z.string().min(6, "Sua senha precisa ter no mínimo 6 caracteres"),
});
