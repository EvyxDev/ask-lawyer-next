"use client";
import { useTranslations } from "next-intl";
import { useState, useRef, forwardRef, useEffect } from "react";
import { X } from "lucide-react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ContactForm, contactSchema } from "@/lib/schemes/types/Contact";

interface ContactProps {
  onSuccess: (data: ContactForm, files: File[]) => void;
  onValidityChange?: (valid: boolean) => void;
}

const Contact = forwardRef<HTMLFormElement, ContactProps>(
  ({ onSuccess, onValidityChange }, ref) => {
    const t = useTranslations("service");
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      setValue,
    } = useForm<ContactForm>({
      resolver: zodResolver(contactSchema),
      mode: "onChange",
    });

    useEffect(() => {
      onValidityChange?.(isValid);
    }, [isValid, onValidityChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []) as File[];
  setFiles((prev) => [...prev, ...selectedFiles]);
  setValue("files", selectedFiles, { shouldValidate: true });
};
   const handleRemoveFile = (index: number) => {
  setFiles((prev) => {
    const newFiles = prev.filter((_, i) => i !== index);
    setValue("files", newFiles, { shouldValidate: true });
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
    return newFiles;
  });
};

    const onSubmit = (data: ContactForm) => {
      onSuccess(data, files); 
    };

    return (
        <div className="lg:m-6 md:m-4 m-0 bg-[#FFFFFF] rounded-lg shadow-md p-4 min-h-screen">
          <form
            ref={ref}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-4xl mx-auto container flex flex-col gap-4"
          >
            <h1 className="text-secondary lg:text-4xl md:text-3xl text-2xl font-semibold">
              {t("whoProvidesService")}
            </h1>
            <div className="flex lg:flex-row flex-col gap-6 w-full">
              <div className="flex gap-2 flex-col w-full">
                <label className="flex gap-2">
                  <span className="text-red-400">*</span> {t("name")}
                </label>
                <input
                  {...register("first_name")}
                  className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder={t("name")}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-col w-full">
                <label className="flex gap-2">
                  <span className="text-red-400">*</span> {t("lastName")}
                </label>
                <input
                  {...register("last_name")}
                  className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder={t("lastName")}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-6 w-full">
              <div className="flex gap-2 flex-col w-full">
                <label className="flex gap-2">
                  <span className="text-red-400">*</span> {t("email")}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder={t("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex gap-2 flex-col w-full">
                <label className="flex gap-2">
                  <span className="text-red-400">*</span> {t("phonenumber")}
                </label>
                <input
                  {...register("mobile")}
                  type="tel"
                  className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder={t("phonenumber")}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-2 flex-col w-full">
                <label className="flex gap-2">
                  <span className="text-red-400">*</span> {t("orderSummary")}
                </label>
                <textarea
                  {...register("summary")}
                  className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder={t("orderSummary")}
                />
                {errors.summary && (
                  <p className="text-red-500 text-sm">{errors.summary.message}</p>
                )}
              </div>
              <div className="flex gap-2 flex-col w-full">
                <label className="flex gap-2">
                  <span className="text-red-400">*</span> {t("yourMessage")}
                </label>
                <textarea
                  {...register("message")}
                  className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder={t("yourMessage")}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-col w-full">
              <label className="flex gap-2">
                <span className="text-red-400">*</span> {t("file")}
              </label>
              <input
                type="file"
                accept="*/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex border-dashed border-secondary border-2 flex-col items-center justify-center h-48 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                {t("maxFileSize")}
                <FaCloudUploadAlt size={40} className="text-primary" />
              </div>
              {errors.files && (
                <p className="text-red-500 text-sm">{errors.files.message}</p>
              )}
              {files.length > 0 && (
                <div className="mt-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md mb-2"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className="hidden">
              Submit
            </Button>
          </form>
        </div>
    );
  }
);

Contact.displayName = "Contact";

export default Contact;