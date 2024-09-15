import { z } from 'zod';
import { phoneSchema } from './util.js';
export const NewContactSchema = z.object({
    name: z.string().min(2),
    phone: phoneSchema,
});
