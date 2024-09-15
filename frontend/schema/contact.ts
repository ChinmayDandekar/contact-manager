import { z } from 'zod'
import { phoneSchema } from './util'

export const NewContactSchema = z.object({
    name: z.string().min(2),
    phone: phoneSchema,
})