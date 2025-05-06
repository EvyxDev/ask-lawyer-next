"use client";
import Image from "next/image";
import { contactus } from "../../../public/assets";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactUsSchema, contactUsType } from "@/lib/schemes/types/contactUs";
import { sendContactForm } from "@/lib/apis/home";
import { useMutation } from "@tanstack/react-query";
import { FiLoader } from "react-icons/fi";

const ContactUs = () => {
  const t = useTranslations("contactus");
  const ContactSchema = contactUsSchema({
    emailInvalid: t("errors.email.invalid"),
    emailRequired: t("errors.email.required"),
    name: t("errors.name"),
    mobile: t("errors.mobile"),
    content: t("errors.content"),
    subject: t("errors.subject"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<contactUsType>({
    resolver: zodResolver(ContactSchema),
  });

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      reset(); // Reset form fields on success
    },
    onError: (err) => {
      console.error("Form submission error:", err);
    },
  });

  const onSubmit = (data: contactUsType) => {
    mutate({
      email: data.email,
      name: data.name,
      mobile: data.mobile,
      content: data.content,
      subject: data.subject,
    });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center w-full">
      <div className="flex lg:flex-row flex-col gap-8 justify-between items-center w-full mx-auto container">
        <div className="w-full lg:justify-start justify-center items-center flex">
          <Image
            width={500}
            src={contactus}
            className="bg-cover"
            alt="contact us background"
          />
        </div>
        <div className="w-full p-4">
          <div className="flex gap-4 items-center my-8">
            <h2 className="text-5xl text-primary my-8 font-semibold">
              {t("title")}
            </h2>
            <div className="bg-secondary w-36 h-[6px] mt-4"></div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 !text-[#737B8F] text-xl"
          >
            <div className="flex lg:flex-row flex-col gap-6 w-full">
              <div className="lg:w-1/2 w-full">
                <input
                  className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full"
                  placeholder={t("phone")}
                  {...register("mobile")}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
              <div className="lg:w-1/2 w-full">
                <input
                  className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full"
                  placeholder={t("name")}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-6 w-full">
              <div className="lg:w-1/2 w-full">
                <input
                  className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full"
                  placeholder={t("email")}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="lg:w-1/2 w-full">
                <input
                  className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full"
                  placeholder={t("subject")}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <textarea
                className="bg-[#F5F5F5] rounded-md py-3 px-6 w-full min-h-56"
                placeholder={t("message")}
                {...register("content")}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error instanceof Error ? error.message : t("unknown_error")}
              </p>
            )}
            {data && !data.error && (
              <p className="text-green-500 text-md text-center">
                {t("success_message")}
              </p>
            )}
            <div className="w-full flex justify-end items-end">
              <button
                className="bg-secondary hover:bg-secondary-dark transition-all duration-700 cursor-pointer lg:w-40 w-36 text-white py-3 rounded-md"
                disabled={isPending}
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;