import z from 'zod'

export const listQuerySchema = z.object({
  page: z.optional(z.number().min(1)).default(1),
  limit: z.optional(z.number().min(1)).default(50),
})

export const movieSchema = z.object({
  original_title: z.string(),
  published: z
    .number()
    .min(0)
    .max(1)
    .transform((n) => Boolean(n)),
  production_year: z.string(),
  video_id: z.string(),
  poster: z.string(),
  production_country: z.array(z.string()),
  actors: z.array(z.string()),
  directors: z.array(z.string()),
})

export type MovieModel = z.infer<typeof movieSchema>
