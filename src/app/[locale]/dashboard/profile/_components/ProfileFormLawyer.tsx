"use client";

import { ClientImage } from "@/components/ClientImage";
import { Button } from "@/components/ui/button";
import { FilePenLine, Camera } from "lucide-react";
import { placeholder } from "../../../../../../public/assets";
import { useLocale, useTranslations } from "next-intl";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getCountries,
  getCities,
  getlegalFileds,
  getLanguages,
} from "@/lib/apis/requestform";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { updateProfileLawyer } from "@/lib/apis/profile";
import { toast } from "sonner";
import { MultiSelect, type Option } from "@/components/multi-select";
import { useState } from "react";

const ProfileFormLawyer = ({ profileData }: { profileData: ProfileLawyer }) => {
  const t = useTranslations("settings-dashboard");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const [selectedLegal, setSelectedLegal] = useState<Option[]>(
    profileData.legal_fields.map((field) => ({
      id: field.id,
      name: field.name,
    }))
  );
const [selectedLanguages, setSelectedLanguages] = useState<Option[]>(
  profileData.languages?.map((lang) => ({
    id: lang.id,
    name: lang.name,
  })) ?? []
);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormDataLawyer>({
    defaultValues: {
      name: profileData.name,
      email: profileData.email,
      title: profileData.title,
      mobile: profileData.mobile,
      country_id: profileData.country_id,
      city_id: profileData.city_id,
      address: profileData.address,
      education: profileData.education ?? "",
      medals: profileData.medals,
      legal_fields: profileData.legal_fields.map((field) => field.id),
            languages: profileData.languages?.map((field) => field.id) ?? [],

      img: profileData.img_url || placeholder,
    },
  });

  const selectedCountry = watch("country_id");

  const { data: countriesData } = useQuery({
    queryKey: ["Countries", locale],
    queryFn: () => getCountries(locale),
  });
    const { data: languagesData } = useQuery({
      queryKey: ["Languages", locale],
      queryFn: () => getLanguages(locale),
    });
  const { data: legalFiledsData } = useQuery({
    queryKey: ["legal-Fileds", locale],
    queryFn: () => getlegalFileds(locale),
  });

  const { data: citiesData } = useQuery({
    queryKey: ["Cities", locale, selectedCountry],
    queryFn: () => getCities(locale, selectedCountry),
    enabled: !!selectedCountry,
  });
  const mutation = useMutation({
    mutationFn: (data: ProfileFormDataLawyer) => updateProfileLawyer(data),
    onSuccess: () => {
      toast.success(t("profile_updated_successfully"), {
        className: "!bg-primary !text-white !border-primary",
      });
    },
    onError: (error: Error) => {
      toast.error(t("error_updating_profile") + ": " + error.message, {
        className: "!bg-red-400 !text-white !border-red-500",
      });
    },
  });

  const onSubmit = (data: ProfileFormDataLawyer) => {
    mutation.mutate(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.warning(t("invalid_image_type"), {
          className: "!bg-amber-500 !text-white",
        });
        return;
      }
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.warning(t("image_too_large"), {
          className: "!bg-amber-500 !text-white",
        });

        return;
      }

      setValue("img", file);
    }
  };
  const img = watch("img");

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="bg-[#FFFFFF] rounded-lg shadow-md flex justify-center max-w-5xl mx-auto container h-full">
        <div className="lg:p-8 md:p-6 p-4 w-full flex justify-between items-center lg:gap-8 md:gap-6 gap-4">
          <div className="flex gap-4 items-center">
            <div className="relative shrink-0">
              <ClientImage
                width={80}
                height={80}
                src={
                  img instanceof File
                    ? URL.createObjectURL(img)
                    : img ?? placeholder
                }
                alt={profileData?.name || "User Profile"}
                className="object-cover size-24 border-primary border-[2px] rounded-full shrink-0"
                priority
              />
              <label className="absolute left-0 bottom-0 bg-secondary p-2 rounded-full text-white cursor-pointer">
                <Camera size={20} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <span className="flex gap-2 flex-col">
              <h2 className="text-md font-semibold">
                {watch("name") || t("NA")}
              </h2>
              <p>{watch("email")}</p>
            </span>
          </div>
          <Button
            type="submit"
            form="profile-form"
            className="text-md py-5 cursor-pointer md:flex hidden gap-2 rounded-sm border-primary hover:text-white bg-transparent text-black border-[2px] !hover:bg-transparent hover:bg-none w-28"
          >
            <FilePenLine />
            {t("edit")}
          </Button>
        </div>
      </div>
      <form
        id="profile-form"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#FFFFFF] rounded-lg shadow-md flex justify-center max-w-5xl mx-auto container h-full"
      >
        <div className="p-8 w-full flex flex-col lg:gap-8 md:gap-6 gap-4">
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="text-md py-5 cursor-pointer flex gap-2 rounded-sm border-primary hover:text-white bg-transparent text-black border-[2px] !hover:bg-transparent hover:bg-none w-28"
            >
              <FilePenLine />
              {t("edit")}
            </Button>
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <label className="px-4 font-[500]">
                {t("job-title")}
                <span className="text-red-500 font-[500] px-2">*</span>
              </label>
              <Controller
                name="title"
                control={control}
                rules={{ required: t("job_title_required") }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border-[#E5E5E5] border-b-2 focus:outline-0 py-3 px-4 w-full"
                    placeholder={t("job-title")}
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm px-4">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="px-4 font-[500]">
                {t("name")}
                <span className="text-red-500 font-[500] px-2">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: t("name_required") }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border-[#E5E5E5] border-b-2 focus:outline-0 py-3 px-4 w-full"
                    placeholder={t("name")}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm px-4">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label className="px-4 font-[500]">
              {t("email")}
              <span className="text-red-500 font-[500] px-2">*</span>
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: t("email_required"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("invalid_email"),
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border-[#E5E5E5] border-b-2 focus:outline-0 py-3 px-4 w-full"
                  placeholder={t("email")}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm px-4">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <Controller
                name="country_id"
                control={control}
                rules={{ required: t("country_required") }}
                render={({ field }) => (
                  <Select
                    dir={direction}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setValue("city_id", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md">
                      <SelectValue placeholder={t("country")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("countries")}</SelectLabel>
                        {countriesData?.data?.map((country: Country) => (
                          <SelectItem
                            key={country.id}
                            value={country.id.toString()}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country_id && (
                <p className="text-red-500 text-sm px-4">
                  {errors.country_id.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <Controller
                name="city_id"
                control={control}
                rules={{ required: t("city_required") }}
                render={({ field }) => (
                  <Select
                    dir={direction}
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedCountry}
                  >
                    <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md">
                      <SelectValue placeholder={t("city")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{t("cities")}</SelectLabel>
                        {citiesData?.data?.map((city: City) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city_id && (
                <p className="text-red-500 text-sm px-4">
                  {errors.city_id.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <label className="px-4 font-[500]">
                {t("phone")}
                <span className="text-red-500 font-[500] px-2">*</span>
              </label>
              <Controller
                name="mobile"
                control={control}
                rules={{ required: t("phone_required") }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border-[#E5E5E5] border-b-2 focus:outline-0 py-3 px-4 w-full"
                    placeholder={t("phone")}
                  />
                )}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm px-4">
                  {errors.mobile.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="px-4 font-[500]">
                {t("address")}
                <span className="text-red-500 font-[500] px-2">*</span>
              </label>
              <Controller
                name="address"
                control={control}
                rules={{ required: t("address_required") }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border-[#E5E5E5] border-b-2 focus:outline-0 py-3 px-4 w-full"
                    placeholder={t("address")}
                  />
                )}
              />
              {errors.address && (
                <p className="text-red-500 text-sm px-4">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex lg:flex-row flex-col gap-6 w-full">
            <div className="lg:w-1/2 w-full">
              <label className="px-4 font-[500]">
                {t("education")}
                <span className="text-red-500 font-[500] px-2">*</span>
              </label>
              <Controller
                name="education"
                control={control}
                rules={{ required: t("education_required") }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border-[#E5E5E5] border-b-2 focus:outline-0 py-3 px-4 w-full"
                    placeholder={t("education")}
                  />
                )}
              />
              {errors.education && (
                <p className="text-red-500 text-sm px-4">
                  {errors.education.message}
                </p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="px-4 font-[500]">
                {t("medals")}
                <span className="text-red-500 font-[500] px-2">*</span>
              </label>
              <Controller
                name="medals"
                control={control}
                rules={{ required: t("medals_required") }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border-[#E5E5E5] border-b-2 focus:outline-0 py-3 px-4 w-full"
                    placeholder={t("address")}
                  />
                )}
              />
              {errors.medals && (
                <p className="text-red-500 text-sm px-4">
                  {errors.medals.message}
                </p>
              )}
            </div>
          </div>

         
          <div className="flex lg:flex-row flex-col gap-6 w-full">
               <div className="lg:w-1/2 w-full">
            <Controller
              name="legal_fields"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  placeholder={t("legal_fields")}
                  options={(legalFiledsData?.data || []).map((field: City) => ({
                    id: field.id,
                    name: field.name,
                  }))}
                  selected={selectedLegal}
                  onChange={(options) => {
                    setSelectedLegal(options);
                    field.onChange(options.map((option) => option.id));
                  }}
                />
              )}
            />
            {errors.legal_fields && (
              <p className="text-red-500">{errors.legal_fields.message}</p>
            )}
          </div>
            <div className="lg:w-1/2 w-full">
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  placeholder={t("languages")}
                  options={(languagesData?.data || []).map((lang: City) => ({
                    id: lang.id,
                    name: lang.name,
                  }))}
                  selected={selectedLanguages}
                  onChange={(options) => {
                    setSelectedLanguages(options);
                    field.onChange(options.map((option) => option.id));
                  }}
                />
              )}
            />
            {errors.languages && (
              <p className="text-red-500">{errors.languages.message}</p>
            )}
          </div>
            </div>

          <div className="w-full flex justify-end items-end">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="mt-4 bg-primary text-white py-5 rounded-md"
            >
              {mutation.isPending ? t("submitting") : t("save_changes")}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfileFormLawyer;
