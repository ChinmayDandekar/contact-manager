import { z } from 'zod'
import { otpSchema, phoneSchema } from './util.js'


export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string().optional(),
    country: z.string().optional(),
    phone: phoneSchema
})


export const VerifySchema = z.object({
    email: z.string().email(),
    otp: otpSchema
})
