import { z } from 'zod'

export const NewProductSchema = z.object({
  name: z.string().min(3, 'O nome precisa ter no mínimo 3 letras.'),
  size: z.string().min(1, 'Tamanho é um campo obrigatório.'),
  price: z.string().min(1, 'Preço é um campo obrigatório.'),
  stock: z.coerce.number().min(1, 'Quantidade é um campo obrigatório'),
  brand: z.string().min(3, 'A marca precisa ter no mínimo 3 letras.'),
  color: z
    .string({ required_error: 'Selecione uma cor para continuar.' })
    .min(3, 'A cor precisa ter no mínimo 3 letras.'),
  category: z
    .string({ required_error: 'Selecione uma categoria para continuar.' })
    .min(3, 'A categoria precisa ter no mínimo 3 letras.'),
  obs: z.string().nullable(),
})
