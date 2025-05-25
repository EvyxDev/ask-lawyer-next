import { z } from "zod";

export const RequestFormSchema = (translations: {
  emailInvalid: string;
  emailRequired: string;
  country_id: string;
  lang_id: string;
  name: string;
  mobile: string;
  message: string;
}) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: translations.emailRequired })
      .email({ message: translations.emailInvalid }),
    name: z.string().min(1, { message: translations.name }),

    mobile: z.string().min(1, { message: translations.mobile }),
    message: z.string().min(1, { message: translations.message }),
    lawyer_id: z.number().optional(),
    country_id: z.number(),
    lang_id: z.number(),
  });
};

export type RequestFormType = z.infer<ReturnType<typeof RequestFormSchema>>;
