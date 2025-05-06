import { z } from 'zod';

export const contactUsSchema = (translations: {
  emailInvalid: string;
  emailRequired: string;
  name: string;
  mobile: string;
  subject: string;
  content: string;
}) => {
  return z.object({
    email: z
      .string()
      .min(1, {
        message: translations.emailRequired,
      })
      .email({
        message: translations.emailInvalid,
      }),
    name: z.string().min(1, {
      message: translations.name,
    }),
    mobile: z.string().min(1, {
      message: translations.mobile,
    }),
    subject: z.string().min(1, {
      message: translations.subject,
    }),
    content: z.string().min(1, {
      message: translations.content,
    }),
  });
};



export type contactUsType = z.infer<ReturnType<typeof contactUsSchema>>;