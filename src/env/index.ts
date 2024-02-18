import { z } from 'zod'

const EnvSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  SERVER_URL: z.string().url().min(1),
})

export const env = EnvSchema.parse(import.meta.env)
