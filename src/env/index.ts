import { z, ZodFormattedError } from 'zod'

const EnvSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']).default('development'),
  VITE_CLERK_PUBLISHABLE_KEY: z.string({
    required_error: 'env not provided!',
  }),
  VITE_SERVER_URL: z
    .string({ required_error: 'env not provided!' })
    .url({ message: 'must be an URL format.' }),
})

const _env = EnvSchema.safeParse(import.meta.env)

function formatErrors(errors: ZodFormattedError<Map<string, string>>) {
  return Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}`
      }
      return undefined
    })
    .filter(Boolean)
}

if (!_env.success) {
  console.error(
    '❌ ENVIRONMENT VARIABLES ERROR ❌',
    formatErrors(_env.error.format()),
  )

  console.warn('WARN: PLEASE CHECK IF YOU HAVE CORRECTLY CONFIGURED YOUR ENV!')
  throw new Error('INVALID ENVIRONMENT VARIABLES')
}

for (const key of Object.keys(_env.data)) {
  if (!key.startsWith('VITE_')) {
    console.warn(
      `❌ INVALID PUBLIC ENV VARIABLE NAME: ${key}. IT MUST BEGIN WITH 'VITE_'`,
    )
    throw new Error('INVALID PUBLIC ENV VARIABLES NAME')
  }
}
export const env = _env.data
