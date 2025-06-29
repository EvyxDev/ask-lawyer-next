// types/authSchema.ts
import { z } from "zod";

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
    password: z.string().min(8, {
      message: translations.passwordMin,
    }),
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
export const getRegisterUserSchema = (translations: {
  emailInvalid: string;
  emailRequired: string;
  passwordMin: string;
  passwordFormat: string;
  passwordConfirmationMatch: string;
}) => {
  return z
    .object({
      email: z
        .string()
        .min(1, { message: translations.emailRequired })
        .email({ message: translations.emailInvalid }),
      password: z
        .string()
        .min(8, { message: translations.passwordMin })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
          message: translations.passwordFormat,
        }),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: translations.passwordConfirmationMatch,
      path: ["password_confirmation"],
    });
};

export const getRegisterLawyerSchema = (translations: {
  emailInvalid: string;
  emailRequired: string;
  passwordMin: string;
  passwordFormat: string;
  passwordConfirmationMatch: string;
  imageInvalid: string;
  nameRequired: string;
  titleRequired: string;
  mobileInvalid: string;
  addressRequired: string;
  countryRequired: string;
  cityRequired: string;
  languagesRequired: string;
  languagesInvalid: string;
  legalFiledsInvalid: string;
  legalFiledsRequired: string;
  medalsRequired: string;
  educationRequired: string;
  registrationnumberRequired: string;
  requiredField: string;
  activeTab?: string;
  type?: string;
}) => {
  return z
    .object({
      email: z
        .string()
        .min(1, { message: translations.emailRequired })
        .email({ message: translations.emailInvalid }),
      name: z.string().min(1, { message: translations.nameRequired }),
      title: z.string().min(1, { message: translations.titleRequired }),
      mobile: z.string().min(10, { message: translations.mobileInvalid }),
      address: z.string().min(1, { message: translations.addressRequired }),
      city_id: z.string().min(1, { message: translations.cityRequired }),
      country_id: z.string().min(1, { message: translations.countryRequired }),
      registration_number: z
        .string()
        .min(1, { message: translations.registrationnumberRequired }),
      education: z.string().min(1, { message: translations.educationRequired }),
      medals: z.string().min(1, { message: translations.medalsRequired }),
      type: z.string(),
      parent_id: z.string().optional(),
      name_company:
        translations.activeTab === "lawFirm_owner"
          ? z.string().min(1, { message: translations.requiredField })
          : z.string().optional(),
      bio_company:
        translations.activeTab === "lawFirm_owner"
          ? z.string().min(1, { message: translations.requiredField })
          : z.string().optional(),
      linked_in_company:
        translations.activeTab === "lawFirm_owner"
          ? z.string().min(1, { message: translations.requiredField })
          : z.string().optional(),
      website_company:
        translations.activeTab === "lawFirm_owner"
          ? z.string().min(1, { message: translations.requiredField })
          : z.string().optional(),
      address_company:
        translations.activeTab === "lawFirm_owner"
          ? z.string().min(1, { message: translations.requiredField })
          : z.string().optional(),
      city_id_company:
        translations.activeTab === "lawFirm_owner"
          ? z.string().min(1, { message: translations.requiredField })
          : z.string().optional(),
      country_id_company:
        translations.activeTab === "lawFirm_owner"
          ? z.string().min(1, { message: translations.requiredField })
          : z.string().optional(),

      account_type: z.string().transform((val) => val),
      img: z
        .any()
        .refine(
          (file) =>
            !file ||
            (file instanceof File &&
              ["image/png", "image/jpeg"].includes(file.type)),
          { message: translations.imageInvalid }
        )
        .nullable(),
      photo_union_card: z
        .any()
        .refine(
          (file) =>
            !file ||
            (file instanceof File &&
              ["image/png", "image/jpeg"].includes(file.type)),
          { message: translations.imageInvalid }
        )
        .nullable(),
         card_id_img: z
        .any()
        .refine(
          (file) =>
            !file ||
            (file instanceof File &&
              ["image/png", "image/jpeg"].includes(file.type)),
          { message: translations.imageInvalid }
        )
        .nullable(),
      photo_passport: z
        .any()
        .refine(
          (file) =>
            !file ||
            (file instanceof File &&
              ["image/png", "image/jpeg"].includes(file.type)),
          { message: translations.imageInvalid }
        )
        .nullable(),
        photo_office_rent: z
        .any()
        .refine(
          (file) =>
            !file ||
            (file instanceof File &&
              ["image/png", "image/jpeg"].includes(file.type)),
          { message: translations.imageInvalid }
        )
        .nullable(),
      password: z
        .string()
        .min(8, { message: translations.passwordMin })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
          message: translations.passwordFormat,
        }),
      password_confirmation: z.string(),
      languages: z
        .array(z.number().int().positive(), {
          message: translations.languagesInvalid,
        })
        .min(1, { message: translations.languagesRequired }),
      legal_fields: z
        .array(z.number().int().positive(), {
          message: translations.legalFiledsInvalid,
        })
        .min(1, { message: translations.legalFiledsRequired }),
    })

    .refine((data) => data.password === data.password_confirmation, {
      message: translations.passwordConfirmationMatch,
      path: ["password_confirmation"],
    });
};

export type RegisterLawyerSchemaType = z.infer<
  ReturnType<typeof getRegisterLawyerSchema>
>;
export type RegisterUserSchemaType = z.infer<
  ReturnType<typeof getRegisterUserSchema>
>;
export type LoginFormType = z.infer<ReturnType<typeof getLoginSchema>>;
export type ForgotPasswordFormType = z.infer<
  ReturnType<typeof getForgotPassword>
>;
