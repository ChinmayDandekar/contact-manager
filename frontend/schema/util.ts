import { z } from "zod";

export const phoneSchema = z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number. It must be exactly 10 digits.",
  });
  