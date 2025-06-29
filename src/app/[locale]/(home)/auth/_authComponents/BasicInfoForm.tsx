import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RegisterLawyerSchemaType } from "@/lib/schemes/types/authSchema";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface BasicInfoFormProps {
  register: UseFormRegister<RegisterLawyerSchemaType>;
  errors: FieldErrors<RegisterLawyerSchemaType>;
  handleNext: () => void;
}

const BasicInfoForm = ({
  register,
  errors,
  handleNext,
}: BasicInfoFormProps) => {
  const t = useTranslations("register");
  const [showFields, setShowFields] = useState({
    password: false,
    passwordConfirmation: false,
  });
  //toggle password
  const toggleFieldVisibility = (
    field: "password" | "passwordConfirmation"
  ) => {
    setShowFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <>
      <div>
        <input
          type="email"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.email")}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          type={showFields.password ? "text" : "password"}
          {...register("password")}
          id="password"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
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
        type="button"
        onClick={handleNext}
        className="lg:text-2xl md:text-xl text-lg cursor-pointer md:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
      >
        {t("next")}
      </button>
    </>
  );
};

export default BasicInfoForm;
