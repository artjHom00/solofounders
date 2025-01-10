import { z } from 'zod'

export const byIdSchema = z.object({
  id: z.number({ coerce: true }).min(0).int()
})
