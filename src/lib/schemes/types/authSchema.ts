// types/authSchema.ts
import { z } from 'zod';

export const getLoginSchema = (translations: {
  emailInvalid: string;
  emailRequired: string;
  passwordMin: string;
  passwordFormat: string;
}) => {
  return z.object({
    email: z
      .string()
      .email({
        message: translations.emailInvalid,
      })
      .min(1, {
        message: translations.emailRequired,
      }),
    password: z
      .string()
      .min(8, {
        message: translations.passwordMin,
      })
      
  });
};

type Translations = {
  emailInvalid: string;
  emailRequired: string;
};

export const getForgotPassword = (translations: Translations) =>
  z.object({
    email: z
      .string({
        required_error: translations.emailRequired,
      })
      .min(1, { message: translations.emailRequired })
      .email({ message: translations.emailInvalid }),
  });
export type LoginFormType = z.infer<ReturnType<typeof getLoginSchema>>;
export type ForgotPasswordFormType = z.infer<ReturnType<typeof getForgotPassword>>;