import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { getRegisterUserSchema } from "@/lib/schemes/types/authSchema";
import { FiLoader } from "react-icons/fi";
import { registerUser } from "@/lib/apis/auth";

import OtpDialog from "./OtpDialog";

const ClientForm = () => {
  const t = useTranslations("register");
  const [showFields, setShowFields] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const toggleFieldVisibility = (
    field: "password" | "passwordConfirmation"
  ) => {
    setShowFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterUserType>({
    resolver: zodResolver(
      getRegisterUserSchema({
        emailInvalid: t("errors.emailInvalid"),
        emailRequired: t("errors.emailRequired"),
        passwordMin: t("errors.passwordMin"),
        passwordFormat: t("errors.passwordFormat"),
        passwordConfirmationMatch: t("errors.passwordConfirmationMatch"),
      })
    ),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      email,
      password,
      password_confirmation,
    }: RegisterUserType) =>
      registerUser(email, password, password_confirmation),
    onSuccess: (data, variables) => {
      setRegisteredEmail(variables.email);
      setIsDialogOpen(true);
      reset();
    },
    onError: (err) => {
      console.error("Form submission error:", err);
    },
  });

  const onSubmit: SubmitHandler<RegisterUserType> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  };

  return (
    <section>
      <div className="rtl:text-right w-full flex flex-col justify-center gap-8 ">
        <h2 className="text-4xl">{t("title")}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-8"
        >
          <div>
            <input
              type="email"
              className={`peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 `}
              placeholder={t("labels.email")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showFields.password ? "text" : "password"}
              {...register("password")}
              id="password"
              className={`peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 `}
              placeholder={t("labels.password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
            <button
              type="button"
              className="absolute ltr:end-4 rtl:start-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors duration-200 cursor-pointer"
              onClick={() => toggleFieldVisibility("password")}
            >
              {showFields.password ? (
                <AiOutlineEyeInvisible className="h-6 w-6" />
              ) : (
                <AiOutlineEye className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type={showFields.passwordConfirmation ? "text" : "password"}
              {...register("password_confirmation")}
              id="password_confirmation"
              className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("labels.password_confirmation")}
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password_confirmation.message}
              </p>
            )}
            <button
              type="button"
              className="absolute ltr:end-4 rtl:start-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors duration-200 cursor-pointer"
              onClick={() => toggleFieldVisibility("passwordConfirmation")}
            >
              {showFields.passwordConfirmation ? (
                <AiOutlineEyeInvisible className="h-6 w-6" />
              ) : (
                <AiOutlineEye className="h-6 w-6" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="text-2xl cursor-pointer py-3 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
          >
            {isPending ? (
              <span className="w-full flex justify-center items-center">
                <FiLoader className="animate-spin duration-500 text-2xl text-primary" />
              </span>
            ) : (
              t("title")
            )}
          </button>
        </form>
      </div>
      <OtpDialog
        setIsDialogOpen={setIsDialogOpen}
        registeredEmail={registeredEmail}
        isDialogOpen={isDialogOpen}
      />
    </section>
  );
};

export default ClientForm;
