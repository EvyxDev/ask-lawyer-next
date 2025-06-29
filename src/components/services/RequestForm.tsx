/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";

import {
  RequestFormSchema,
  RequestFormType,
} from "@/lib/schemes/types/requestForm";
import { getCountries, getLanguages, getLawyers } from "@/lib/apis/requestform";
import { sendRequestForm } from "@/lib/apis/requestServiceform";
import { useSession } from "next-auth/react";

const RequestForm = ({
  lawyerId,
  type,
  lawyer_type,
  token,
}: {
  lawyerId?: string;
  type: string;
  lawyer_type: string;
  token: string | null;
}) => {
  const t = useTranslations("RequestForm");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const { data: session } = useSession();
  const { data: CountriesData } = useQuery({
    queryKey: ["Countries"],
    queryFn: () => getCountries(locale),
  });
  const { data: languagesData } = useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages(locale),
  });
  const { data: lawyersData } = useQuery({
    queryKey: ["lawyers"],
    queryFn: () => getLawyers(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RequestFormType>({
    resolver: zodResolver(
      RequestFormSchema({
        emailInvalid: t("errors.emailInvalid"),
        emailRequired: t("errors.emailRequired"),
        name: t("errors.name"),
        mobile: t("errors.mobile"),
        message: t("errors.message"),
        country_id: t("errors.country_id"),
        lang_id: t("errors.lang_id"),
      })
    ),
    defaultValues: {
      email: "",
      name: "",
      mobile: "",
      message: "",
      country_id: undefined,
      lang_id: undefined,
      lawyer_id: lawyerId ? Number(lawyerId) : undefined,
    },
  });

  const lawyerIdValue = watch("lawyer_id");
  const role = session?.user?.role;

  // Mutation for form submission
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: sendRequestForm,
    onSuccess: () => {
      reset();
    },
    onError: (err) => {
      console.error("Form submission error:", err);
    },
  });

  const onSubmit: SubmitHandler<RequestFormType> = (data) => {


    if (!session) {
      toast.error(t("errors.loginRequired"), {
        className: "!bg-red-400 !text-white !border-red-500",
      });
          if (role === "1") {
      toast.error(t("lawyerCannotSubmitRequest"), {
        className: "!bg-red-400 !text-white !border-primary",
      });
    }
      return;
    }
    mutate({
      email: data.email,
      name: data.name,
      mobile: data.mobile,
      message: data.message,
      type,
      country_id: data.country_id,
      lang_id: data.lang_id,
      lawyer_id: data.lawyer_id,
      lawyer_type,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:m-8 md:m-6 m-4">
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        <div className="lg:w-1/2 w-full">
          <input
            className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full"
            placeholder={t("name")}
            {...register("name")}
            dir={direction}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="lg:w-1/2 w-full">
          <Select
            dir={direction}
            onValueChange={(value) => setValue("lawyer_id", Number(value))}
            value={lawyerIdValue ? lawyerIdValue.toString() : undefined}
          >
            <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md">
              <SelectValue placeholder={t("lawyer")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("lawyer")}</SelectLabel>
                {lawyersData?.data?.map((lawyer) => (
                  <SelectItem key={lawyer.id} value={lawyer.id.toString()}>
                    {lawyer.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-6 w-full my-4">
        <div className="lg:w-1/2 w-full">
          <input
            className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full"
            placeholder={t("email")}
            {...register("email")}
            dir={direction}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="lg:w-1/2 w-full">
          <input
            className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full"
            placeholder={t("phone")}
            {...register("mobile")}
            type="tel"
            dir={direction}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-6 w-full my-4">
        <div className="lg:w-1/2 w-full">
          <Select
            dir={direction}
            onValueChange={(value) => setValue("country_id", Number(value))}
          >
            <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md">
              <SelectValue placeholder={t("country")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("countries")}</SelectLabel>
                {CountriesData?.data?.map((country) => (
                  <SelectItem key={country.id} value={country.id.toString()}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.country_id && (
            <p className="text-red-500 text-sm">{errors.country_id.message}</p>
          )}
        </div>
        <div className="lg:w-1/2 w-full">
          <Select
            dir={direction}
            onValueChange={(value) => setValue("lang_id", Number(value))}
          >
            <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md">
              <SelectValue placeholder={t("language")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("languages")}</SelectLabel>
                {languagesData?.data?.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id.toString()}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.lang_id && (
            <p className="text-red-500 text-sm">{errors.lang_id.message}</p>
          )}
        </div>
      </div>
      <textarea
        className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full min-h-48"
        placeholder={t("message")}
        {...register("message")}
        dir={direction}
      />
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message.message}</p>
      )}
      <div className="w-full flex justify-end items-end my-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-secondary hover:bg-secondary-dark transition-all duration-700 cursor-pointer lg:w-40 w-36 text-white py-3 rounded-md disabled:opacity-50"
        >
          {isPending ? (
            <span className="w-full flex justify-center items-center">
              <FiLoader className="animate-spin duration-500 text-2xl text-primary" />
            </span>
          ) : (
            t("send")
          )}
        </button>
      </div>
      {data && <p className="text-green-500">{t("successMessage")}</p>}
      {error && <p className="text-red-500">{t("errors.submitError")}</p>}
    </form>
  );
};

export default RequestForm;
