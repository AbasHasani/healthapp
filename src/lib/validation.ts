import { z } from "zod";

export const userFormValidation = z.object({
  name: z.string().min(2, { message: "must at least 2 charachters" }).max(50, {
    message: "Username should not be more than 50 charachters.",
  }),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});
