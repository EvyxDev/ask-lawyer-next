"use client";
import { Button } from "@/components/ui/button";
import { getCountries } from "@/lib/apis/requestform";
import { useLocale, useTranslations } from "next-intl";
import { type Option } from "@/components/multi-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogSchemaType, getBlogSchema } from "@/lib/schemes/types/blogSchema";
import { addBlogMethod } from "@/lib/apis/blogs";
import { X } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getblogCategory } from "@/lib/apis/home";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";

const AddBlog = () => {
  const t = useTranslations("addblog");
  const locale = useLocale();
  const [selected, setSelected] = useState<Option[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: countriesData = { data: [] } } = useQuery<CountriesResponse>({
    queryKey: ["Countries", locale],
    queryFn: () => getCountries(locale),
  });
  const { data: blogsCategories = [] } = useQuery({
    queryKey: ["blog-Categories", locale],
    queryFn: () => getblogCategory(locale),
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(
      getBlogSchema({
        titleRequired: t("errors.titleRequired"),
        descriptionRequired: t("errors.descriptionRequired"),
        countryRequired: t("errors.countryRequired"),
        blogRequired: t("errors.blogRequired"),
        imgRequired: t("errors.imgRequired"),
      })
    ),
    defaultValues: {
      title: "",
      description: "",
      country_id: "",
      blog_category_id: "",
      img: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      title,
      description,
      country_id,
      blog_category_id,
      img,
    }: BlogSchemaType) =>
      addBlogMethod({ title, description, country_id, blog_category_id, img }),
    onSuccess: () => {
      reset();
      toast.success(t("blog_created_successfully"), {
        className: "!bg-primary !text-white !border-primary",
      });
      setImagePreview(null);
      setSelected([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (err) => {
      toast.error(t("blog_creation_failed") + ": " + err.message, {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });

  const onSubmit: SubmitHandler<BlogSchemaType> = (data) => {
    mutate(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("img", file, { shouldValidate: true });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("img", undefined as any, { shouldValidate: true });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <section>
      <div className="lg:m-6 md:m-4 m-0 bg-[#FFFFFF] rounded-lg shadow-md p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl mx-auto container flex flex-col gap-4"
        >
          <h1 className="text-secondary md:text-4xl text-3xl font-semibold">
            {t("add_blog")}
          </h1>
          <div className="flex gap-2 flex-col w-full">
            <label className="flex gap-2">
              <span className="text-red-400">*</span> {t("title")}
            </label>
            <input
              type="text"
              {...register("title")}
              className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="flex gap-2 flex-col w-full">
            <label className="flex gap-2">
              <span className="text-red-400">*</span> {t("description")}
            </label>
            <textarea
              className="peer w-full py-3 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder={t("description")}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <label className="flex gap-2 mb-2">
                <span className="text-red-400">*</span> {t("city")}
              </label>
              <Controller
                name="country_id"
                control={control}
                rules={{ required: t("errors.countryRequired") }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selected}
                  >
                    <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md !py-6">
                      <SelectValue placeholder={t("city")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("city")}</SelectLabel>
                        {(countriesData?.data ?? []).map((city: City) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country_id && (
                <p className="text-red-500 text-sm">
                  {errors.country_id.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="flex gap-2 mb-2">
                <span className="text-red-400">*</span> {t("blog_category")}
              </label>
              <Controller
                name="blog_category_id"
                control={control}
                rules={{ required: t("errors.blogRequired") }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selected}
                  >
                    <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md !py-6">
                      <SelectValue placeholder={t("blog_category")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("blog_category")}</SelectLabel>
                        {blogsCategories.map((city: City) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.blog_category_id && (
                <p className="text-red-500 text-sm">
                  {errors.blog_category_id.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col w-full">
            {imagePreview ? (
              <div className="relative mt-2 w-full ">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <label className="flex gap-2">
                  <span className="text-red-400">*</span> {t("image")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex border-dashed border-secondary border-2 flex-col items-center justify-center  h-48 w-full cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {t("select_image")}
                  <FaCloudUploadAlt size={40} className="text-primary" />
                </div>
              </>
            )}
            {errors.img && (
              <p className="text-red-500 text-sm">{errors.img.message}</p>
            )}
          </div>

          <div className="w-full flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-secondary hover:bg-secondary-dark transition-all duration-700 h-12 text-white rounded-md shadow-md text-center text-lg font-medium"
            >
              {isPending ? t("submitting") : t("send_new_blog")}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddBlog;
