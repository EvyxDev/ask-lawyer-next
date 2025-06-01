import { forgotPasswordlawyer } from "@/lib/apis/auth";
import {
  getForgotPassword,
  ForgotPasswordFormType,
} from "@/lib/schemes/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";

const LawerForgotPassword = () => {
  const t = useTranslations("Forgot-Password");
  const forgetSchema = getForgotPassword({
    emailInvalid: t("errors.email.invalid"),
    emailRequired: t("errors.email.required"),
  });
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgetSchema),
  });
  const onSubmit = async (data: ForgotPasswordFormType) => {
    setError(null);
    try {
      const result = await forgotPasswordlawyer(data.email);
      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "خطأ غير معروف");
    }
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rtl:text-right w-full flex flex-col justify-center gap-8 "
      >
        <h2 className="text-4xl">{t("title")}</h2>

        <div>
          <input
            type="email"
            className="w-full py-4 rounded-lg border-2 px-4 rtl:text-right"
            placeholder={t("email")}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-2xl cursor-pointer py-4 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
        >
          {isSubmitting ? (
            <span className="w-full flex justify-center items-center">
              <FiLoader className="animate-spin duration-500 text-2xl text-primary" />
            </span>
          ) : (
            t("confirm")
          )}
        </button>
      </form>
    </section>
  );
};

export default LawerForgotPassword;
