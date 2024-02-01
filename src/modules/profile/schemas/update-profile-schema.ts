import { z } from 'zod'

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(3, 'seu nome precisa ter no mínimo 3 letras.')
    .regex(/^\S+$/, 'insira apenas seu primeiro nome.')
    .transform((name) => name.trim()),
  surname: z
    .string()
    .min(3, 'seu sobrenome precisa ter no mínimo 3 letras.')
    .transform((surname) => surname.trim()),
  email: z.string().email('favor inserir um e-mail válido.'),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, 'favor inserir um telefone válido.'),
})
