import { z } from "zod";
export const phoneSchema = z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number. It must be exactly 10 digits.",
});
export const otpSchema = z.number().int().gte(100000, "Invalid Otp").lte(999999, "Invalid Otp");
