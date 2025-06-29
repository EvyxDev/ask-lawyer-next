// في ملف Contact.tsx
import { z } from "zod";

// Zod Schema للـ validation
export const contactSchema = z.object({
  first_name: z.string().min(1, "الاسم الأول مطلوب"),
  last_name: z.string().min(1, "الاسم الأخير مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  mobile: z.string().min(8, "رقم الهاتف غير صالح"),
  summary: z.string().min(10, "ملخص الطلب مطلوب (10 أحرف على الأقل)"),
  message: z.string().min(10, "الرسالة مطلوبة (10 أحرف على الأقل)"),
  files: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => !files || files.length > 0,
      "يجب رفع ملف واحد على الأقل"
    ),
});

export type ContactForm = z.infer<typeof contactSchema>;
