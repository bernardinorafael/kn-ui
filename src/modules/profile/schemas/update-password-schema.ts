import { z } from 'zod'

export const UpdatePasswordSchema = z
  .object({
    password: z.string().min(6, 'Sua senha deve conter no mínimo 6 dígitos.'),
    new_password: z.string().min(1, 'Este é um campo obrigatório.'),
  })
  .refine((data) => data.password === data.new_password, {
    message: 'As senhas não conferem.',
    path: ['new_password'],
  })
