import { z } from 'zod'
import { phoneSchema } from './util'


export const SignUpSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string().optional(),
    country: z.string().optional(),
    phone: phoneSchema
})
