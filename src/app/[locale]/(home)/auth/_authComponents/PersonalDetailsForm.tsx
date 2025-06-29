import {
  Controller,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  Control,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect, type Option } from "@/components/multi-select";
import { RegisterLawyerSchemaType } from "@/lib/schemes/types/authSchema";
import { useLocale, useTranslations } from "next-intl";

interface PersonalDetailsFormProps {
  register: UseFormRegister<RegisterLawyerSchemaType>;
  errors: FieldErrors<RegisterLawyerSchemaType>;
  control: Control<RegisterLawyerSchemaType>;
  setValue: UseFormSetValue<RegisterLawyerSchemaType>;
  selectedCountry: string;
  countriesData?: City[];
  citiesData?: City[];
  languagesData?: City[];
  legalFiledsData?: City[];
  selected: Option[];
  setSelected: (options: Option[]) => void;
  selectedLegal: Option[];
  setSelectedLegal: (options: Option[]) => void;
  direction: string;
  handleBack: () => void;
  handleNext: () => void;
}

const PersonalDetailsForm = ({
  register,
  errors,
  control,
  setValue,
  selectedCountry,
  countriesData,
  citiesData,
  languagesData,
  legalFiledsData,
  selected,
  setSelected,
  selectedLegal,
  setSelectedLegal,
  handleBack,
  handleNext,
}: PersonalDetailsFormProps) => {
  const t = useTranslations("register");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <>
      <div>
        <input
          type="text"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.name")}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.title")}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.address")}
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-2">{errors.address.message}</p>
        )}
      </div>
      <div>
        <input
          type="tel"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.mobile")}
          {...register("mobile")}
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-2">{errors.mobile.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.medals")}
          {...register("medals")}
        />
        {errors.medals && (
          <p className="text-red-500 text-sm mt-2">{errors.medals.message}</p>
        )}
      </div>
      <div>
        <input
          type="number"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.registration_number")}
          {...register("registration_number")}
        />
        {errors.registration_number && (
          <p className="text-red-500 text-sm mt-2">
            {errors.registration_number.message}
          </p>
        )}
      </div>
      <div>
        <input
          type="text"
          className="peer w-full py-4 rtl:text-right rounded-lg border px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          placeholder={t("labels.education")}
          {...register("education")}
        />
        {errors.education && (
          <p className="text-red-500 text-sm mt-2">
            {errors.education.message}
          </p>
        )}
      </div>
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        <div className="lg:w-1/2 w-full">
          <Controller
            name="city_id"
            control={control}
            rules={{ required: t("city_required") }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedCountry}
              >
                <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md !py-6">
                  <SelectValue placeholder={t("city")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("cities")}</SelectLabel>
                    {citiesData?.map((city) => (
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
                <SelectTrigger className="w-full bg-[#F5F5F5] rounded-md !py-6">
                  <SelectValue placeholder={t("country")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("countries")}</SelectLabel>
                    {countriesData?.map((country) => (
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
      </div>
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        <div className="lg:w-1/2 w-full">
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <MultiSelect
                placeholder={t("language")}
                options={(languagesData || []).map((lang) => ({
                  id: lang.id,
                  name: lang.name,
                }))}
                selected={selected}
                onChange={(options) => {
                  setSelected(options);
                  field.onChange(options.map((option) => option.id));
                }}
              />
            )}
          />
          {errors.languages && (
            <p className="text-red-500">{errors.languages.message}</p>
          )}
        </div>
        <div className="lg:w-1/2 w-full">
          <Controller
            name="legal_fields"
            control={control}
            render={({ field }) => (
              <MultiSelect
                placeholder={t("legalFileds")}
                options={(legalFiledsData || []).map((field) => ({
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
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
        className="lg:text-2xl md:text-xl text-lg cursor-pointer md:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
        >
          {t("back")}
        </button>
        <button
          type="button"
          onClick={handleNext}
        className="lg:text-2xl md:text-xl text-lg cursor-pointer md:py-3 py-2 bg-background-dark hover:bg-secondary-dark w-full rounded-lg text-white"
        >
          {t("next")}
        </button>
      </div>
    </>
  );
};

export default PersonalDetailsForm;
