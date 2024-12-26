import { z } from 'zod';

export const paginationSchema = z.object({
  take: z.number({ coerce: true }).min(0).int(),
  skip: z.number({ coerce: true }).min(0).int(),
});