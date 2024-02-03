import { z } from 'zod'

export const NewProductSchema = z.object({
  name: z.string().min(3, 'o nome precisa ter no mínimo 3 letras.'),
  size: z.string().min(1, 'tamanho é um campo obrigatório.'),
  price: z.string().min(1, 'preço é um campo obrigatório.'),
  stock: z.coerce.number().min(1, 'quantidade é um campo obrigatório'),
  brand: z.string().min(3, 'a marca precisa ter no mínimo 3 letras.'),
  color: z
    .string({ required_error: 'selecione uma cor para continuar.' })
    .min(3, 'a cor precisa ter no mínimo 3 letras.'),
  category: z
    .string({ required_error: 'selecione uma categoria para continuar.' })
    .min(3, 'a categoria precisa ter no mínimo 3 letras.'),
  obs: z.string().nullable(),
})
