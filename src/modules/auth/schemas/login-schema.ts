import { z } from 'zod'

// TODO: Melhorar a validação da senha.
export const LoginSchema = z.object({
	email: z.string().email('Digite um e-mail válido'),
	password: z.string().min(8, 'Sua senha precisa ter no mínimo 8 caracteres'),
})
