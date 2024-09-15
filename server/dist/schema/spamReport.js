import { z } from "zod";
export const SpamReportSchema = z.object({
    phone: z.string(),
});
