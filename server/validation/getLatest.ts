import { z } from 'zod'

export const getLatestSchema = z.object({
  take: z.number({ coerce: true }).min(0).int(),
  skip: z.number({ coerce: true }).min(0).int(),
  search: z.string().nonempty().optional(),
})
