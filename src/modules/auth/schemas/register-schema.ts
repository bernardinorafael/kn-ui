import { z } from 'zod'

export const RegisterSchema = z
  .object({
    email: z.string().email('digite um e-mail válido.'),
    password: z.string().min(6, 'sua senha precisa ter no mínimo 6 caracteres.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'As senhas não conferem.',
    path: ['confirmPassword'],
  })
