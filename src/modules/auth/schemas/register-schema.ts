import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string(),
  document: z.coerce.number(),
  email: z.string().email('digite um e-mail válido.'),
  password: z.string().min(8, 'sua senha precisa ter no mínimo 8 caracteres.'),
})
