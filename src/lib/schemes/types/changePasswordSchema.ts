import { z } from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Current password is required" })
      .min(8, { message: "Current password must be at least 8 characters" }),
    new_password: z
      .string()
      .min(1, { message: "New password is required" })
      .min(8, { message: "New password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "New password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "New password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "New password must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "New password must contain at least one special character",
      }),
    new_password_confirmation: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New password and confirmation must match",
    path: ["new_password_confirmation"],
  });