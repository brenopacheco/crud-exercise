import z from 'zod'
import { config } from 'dotenv'

// Load variables from .env
config({ override: false })

// Required environment variable validations
const envSchema = z.object({
  ENV: z.enum(['prod', 'dev', 'staging']).default('dev'),
  DATABASE_URL: z.string().url(),
  PORT: z
    .string()
    .default('3000')
    .refine((v) => Number(v) > 1 && Number(v) < 63535, {
      message: 'Invalid port number',
    }),
})

class ConfigurationError extends Error {
  constructor(errors: { [K: string]: string[] }) {
    const message =
      `Invalid environment variables:\n\n` +
      Object.entries(errors)
        .map((f) => `\t- ${f[0]}: ${f[1][0]}\n`)
        .join('')
    super(message)
    this.name = 'ConfigurationError'
  }
}

// Validate environment variables match required schema
;(() => {
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    throw new ConfigurationError(errors)
  }
})()

export default { ...process.env } as unknown as z.infer<typeof envSchema>
