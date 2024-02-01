import { z } from 'zod'

export const UpdatePasswordSchema = z
  .object({
    password: z.string().min(6, 'sua senha deve conter no mínimo 6 dígitos.'),
    new_password: z.string().min(1, 'sste é um campo obrigatório.'),
  })
  .refine((data) => data.password === data.new_password, {
    message: 'as senhas não conferem.',
    path: ['new_password'],
  })
