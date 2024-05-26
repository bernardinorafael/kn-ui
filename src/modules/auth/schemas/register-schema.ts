import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 letras"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "Sua senha precisa ter no mínimo 6 caracteres"),
});
