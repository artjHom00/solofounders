import { z } from 'zod'

export const bySlugSchema = z.object({
  slug: z.string().nonempty()
})
